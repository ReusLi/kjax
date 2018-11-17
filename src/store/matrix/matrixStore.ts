import { computed, observable, action } from "mobx";

import { CellKey, SelectInfo } from 'interface/common'

// utils 
import MatrixUtils from 'utils/matrix.utils'

import util from './util'

// matrixStore mobx
import cellStore from 'store/cell/cellStore'

class matrixStore {
  /**
   * 矩阵行数
   */
  row: number = 10
  /**
   * 矩阵列数
   */
  col: number = 10
  /**
   * mouse down cell
   */
  mouseDownCell: CellKey
  /**
   * mouse up cell
   */
  mouseUpCell: CellKey
  /**
   * 需要合并的单元格
   */
  mergeCellList: Array<CellKey> = []
  /**
   * 需要隐藏的单元格
   */
  hideCellList: Array<CellKey> = []
  /**
   * 矩阵单元格模型
   */
  @observable cellModels: Array<Array<CellKey>> = []

  constructor() {

  }


  @action setCellModels(cellModels: Array<Array<CellKey>>) {
    this.cellModels = cellModels
  }

  /**
   * 根据cellStore 的 selectInfo (选择的单元格范围)
   * 更新cell list
   * 包括 hide cell list 和 merge cell list
   */
  updateCellList(selectInfo: SelectInfo) {
    const mouseDownCell = selectInfo.startCell,
          mouseUpCell = selectInfo.endCell

    if (util.isSameCellKey(mouseDownCell, mouseUpCell)) {
      return false;
    }

    let SelectInfo: SelectInfo = MatrixUtils.buildXY(mouseDownCell, mouseUpCell)


    let { hideCellList, kc }: { hideCellList: Array<CellKey>, kc: CellKey } = util.getSkipCellByCellKeys(SelectInfo.startCell, SelectInfo.endCell)

    this.mergeCellList.push(kc)
    this.hideCellList = this.hideCellList.concat(hideCellList)
  }

  /**
   * 更新矩阵模型
   */
  updateMatrixModel() {
    const row = this.row,
      col = this.col;

    this.updateCellList(cellStore.selectInfo)
    let cellModels: Array<Array<CellKey>> = util.buildMatrixModel(row, col, this.mergeCellList, this.hideCellList)

    this.cellModels = cellModels
  }

}

export default new matrixStore()
// =============================
// src/reducers/mainReducer.js
// アプリケーションのグローバル状態管理
// =============================

/**
 * 初期状態
 * @type {Object}
 * @property {boolean} isHovered - ホバー状態
 * @property {boolean} isMenuOpen - メニューの開閉状態
 * @property {string} activeSection - 現在のアクティブなセクション
 */
export const initialState = {
  isHovered: false,
  isMenuOpen: false,
  activeSection: "home",
};

/**
 * アクションタイプの定義
 * @enum {string}
 */
export const ACTION_TYPES = {
  SET_HOVER: "SET_HOVER",
  TOGGLE_MENU: "TOGGLE_MENU",
  SET_ACTIVE_SECTION: "SET_ACTIVE_SECTION",
};

/**
 * メインリデューサー
 * 状態の変更を管理する
 * 
 * @param {Object} state - 現在の状態
 * @param {Object} action - 実行するアクション
 * @param {string} action.type - アクションの種類
 * @param {*} [action.payload] - アクションのペイロード（オプション）
 * @returns {Object} 更新後の状態
 */
export function mainReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_HOVER:
      return {
        ...state,
        isHovered: action.payload,
      };

    case ACTION_TYPES.TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    case ACTION_TYPES.SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

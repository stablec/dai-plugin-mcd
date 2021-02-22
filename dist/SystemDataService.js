"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _servicesCore = require("@makerdao/services-core");

var _constants = require("./constants");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _index = require("./index");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SystemDataService = /*#__PURE__*/function (_PublicService) {
  (0, _inherits2["default"])(SystemDataService, _PublicService);

  var _super = _createSuper(SystemDataService);

  function SystemDataService() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.ServiceRoles.SYSTEM_DATA;
    (0, _classCallCheck2["default"])(this, SystemDataService);
    return _super.call(this, name, ['smartContract', 'token']);
  }

  (0, _createClass2["default"])(SystemDataService, [{
    key: "getAnnualBaseRate",
    value: function () {
      var _getAnnualBaseRate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var base, baseBigNumber;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.jug.base();

              case 2:
                base = _context.sent;
                baseBigNumber = new _bignumber["default"](base.toString()).dividedBy(_constants.RAY).plus(1);
                return _context.abrupt("return", baseBigNumber.pow(_constants.SECONDS_PER_YEAR).minus(1).toNumber());

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAnnualBaseRate() {
        return _getAnnualBaseRate.apply(this, arguments);
      }

      return getAnnualBaseRate;
    }()
  }, {
    key: "getSystemWideDebtCeiling",
    value: function () {
      var _getSystemWideDebtCeiling = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var Line;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.vat.Line();

              case 2:
                Line = _context2.sent;
                return _context2.abrupt("return", new _bignumber["default"](Line.toString()).dividedBy(_constants.RAD).toNumber());

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSystemWideDebtCeiling() {
        return _getSystemWideDebtCeiling.apply(this, arguments);
      }

      return getSystemWideDebtCeiling;
    }()
  }, {
    key: "adapterAddress",
    value: function adapterAddress(ilk) {
      var key = 'MCD_JOIN_' + ilk.replace(/-/g, '_');
      return this.get('smartContract').getContractAddress(key);
    }
  }, {
    key: "isGlobalSettlementInvoked",
    value: function () {
      var _isGlobalSettlementInvoked = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var live;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.get('smartContract').getContract('MCD_END').live();

              case 2:
                live = _context3.sent;
                return _context3.abrupt("return", live.eq(0));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function isGlobalSettlementInvoked() {
        return _isGlobalSettlementInvoked.apply(this, arguments);
      }

      return isGlobalSettlementInvoked;
    }()
  }, {
    key: "getSystemSurplus",
    value: function () {
      var _getSystemSurplus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var vowAddr, _yield$Promise$all, _yield$Promise$all2, dai, sin;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                vowAddr = this.get('smartContract').getContractAddress('MCD_VOW');
                _context4.next = 3;
                return Promise.all([this.vat.dai(vowAddr), this.vat.sin(vowAddr)]);

              case 3:
                _yield$Promise$all = _context4.sent;
                _yield$Promise$all2 = (0, _slicedToArray2["default"])(_yield$Promise$all, 2);
                dai = _yield$Promise$all2[0];
                sin = _yield$Promise$all2[1];
                return _context4.abrupt("return", _index.DAI.rad(dai).minus(_index.DAI.rad(sin)));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getSystemSurplus() {
        return _getSystemSurplus.apply(this, arguments);
      }

      return getSystemSurplus;
    }()
  }, {
    key: "getTotalDai",
    value: function () {
      var _getTotalDai = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.t0 = _index.DAI;
                _context5.next = 3;
                return this.vat.debt();

              case 3:
                _context5.t1 = _context5.sent;
                return _context5.abrupt("return", _context5.t0.rad.call(_context5.t0, _context5.t1));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getTotalDai() {
        return _getTotalDai.apply(this, arguments);
      }

      return getTotalDai;
    }() // Helpers ----------------------------------------------

  }, {
    key: "cat",
    get: function get() {
      return this.get('smartContract').getContract('MCD_CAT');
    }
  }, {
    key: "jug",
    get: function get() {
      return this.get('smartContract').getContract('MCD_JUG');
    }
  }, {
    key: "vat",
    get: function get() {
      return this.get('smartContract').getContract('MCD_VAT');
    }
  }, {
    key: "spot",
    get: function get() {
      return this.get('smartContract').getContract('MCD_SPOT');
    }
  }]);
  return SystemDataService;
}(_servicesCore.PublicService);

exports["default"] = SystemDataService;
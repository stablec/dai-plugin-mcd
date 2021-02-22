"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.McdPlugin = exports.defaultTokens = exports.ALLOWANCE_AMOUNT = exports.SAI = exports.defaultCdpTypes = exports.HOT = exports.UNIV2UNIETH = exports.UNIV2LINKETH = exports.UNIV2ETHUSDT = exports.UNIV2DAIUSDC = exports.UNIV2USDCETH = exports.UNIV2WBTCETH = exports.UNIV2DAIETH = exports.AAVE = exports.RENBTC = exports.UNI = exports.GUSD = exports.BAL = exports.YFI = exports.LINK = exports.LRC = exports.COMP = exports.PAXUSD = exports.USDT = exports.MANA = exports.TUSD = exports.WBTC = exports.USDC = exports.GNT = exports.DGD = exports.BAT = exports.OMG = exports.KNC = exports.ZRX = exports.REP = exports.DSR_DAI = exports.DAI = exports.WETH = exports.USD_ETH = exports.USD = exports.MKR = exports.ETH = exports.ServiceRoles = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _assert = _interopRequireDefault(require("assert"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _reduce = _interopRequireDefault(require("lodash/reduce"));

var _uniqBy = _interopRequireDefault(require("lodash/uniqBy"));

var _currency = require("@makerdao/currency");

var _testnet = _interopRequireDefault(require("../contracts/addresses/testnet.json"));

var _kovan = _interopRequireDefault(require("../contracts/addresses/kovan.json"));

var _mainnet = _interopRequireDefault(require("../contracts/addresses/mainnet.json"));

var _abiMap = _interopRequireDefault(require("../contracts/abiMap"));

var _CdpManager = _interopRequireDefault(require("./CdpManager"));

var _SavingsService = _interopRequireDefault(require("./SavingsService"));

var _CdpTypeService = _interopRequireDefault(require("./CdpTypeService"));

var _AuctionService = _interopRequireDefault(require("./AuctionService"));

var _SystemDataService = _interopRequireDefault(require("./SystemDataService"));

var _constants = require("./constants");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

var _WETH = _interopRequireDefault(require("../contracts/abis/WETH9.json"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ServiceRoles = _constants.ServiceRoles;
exports.ServiceRoles = ServiceRoles;
var CDP_MANAGER = ServiceRoles.CDP_MANAGER,
    CDP_TYPE = ServiceRoles.CDP_TYPE,
    SYSTEM_DATA = ServiceRoles.SYSTEM_DATA,
    AUCTION = ServiceRoles.AUCTION,
    SAVINGS = ServiceRoles.SAVINGS; // look up contract ABIs using abiMap.
// if an exact match is not found, prefix-match against keys ending in *, e.g.
// MCD_JOIN_ETH_B matches MCD_JOIN_*
// this implementation assumes that all contracts in kovan.json are also in testnet.json

var addContracts = (0, _reduce["default"])(_testnet["default"], function (result, testnetAddress, name) {
  var abi = _abiMap["default"][name];

  if (!abi) {
    var prefix = Object.keys(_abiMap["default"]).find(function (k) {
      return k.substring(k.length - 1) == '*' && k.substring(0, k.length - 1) == name.substring(0, k.length - 1);
    });
    if (prefix) abi = _abiMap["default"][prefix];
  }

  if (abi) {
    result[name] = {
      abi: abi,
      address: {
        testnet: testnetAddress,
        kovan: _kovan["default"][name],
        mainnet: _mainnet["default"][name]
      }
    };
  }

  return result;
}, {});
var ETH = (0, _currency.createCurrency)('ETH');
exports.ETH = ETH;
var MKR = (0, _currency.createCurrency)('MKR');
exports.MKR = MKR;
var USD = (0, _currency.createCurrency)('USD');
exports.USD = USD;
var USD_ETH = (0, _currency.createCurrencyRatio)(USD, ETH);
exports.USD_ETH = USD_ETH;
var WETH = (0, _currency.createCurrency)('WETH');
exports.WETH = WETH;
var DAI = (0, _currency.createCurrency)('DAI'); // Casting for savings dai

exports.DAI = DAI;
var DSR_DAI = (0, _currency.createCurrency)('DSR-DAI');
exports.DSR_DAI = DSR_DAI;
var REP = (0, _currency.createCurrency)('REP');
exports.REP = REP;
var ZRX = (0, _currency.createCurrency)('ZRX');
exports.ZRX = ZRX;
var KNC = (0, _currency.createCurrency)('KNC');
exports.KNC = KNC;
var OMG = (0, _currency.createCurrency)('OMG');
exports.OMG = OMG;
var BAT = (0, _currency.createCurrency)('BAT');
exports.BAT = BAT;
var DGD = (0, _currency.createCurrency)('DGD');
exports.DGD = DGD;
var GNT = (0, _currency.createCurrency)('GNT');
exports.GNT = GNT;
var USDC = (0, _currency.createCurrency)('USDC');
exports.USDC = USDC;
var WBTC = (0, _currency.createCurrency)('WBTC');
exports.WBTC = WBTC;
var TUSD = (0, _currency.createCurrency)('TUSD');
exports.TUSD = TUSD;
var MANA = (0, _currency.createCurrency)('MANA');
exports.MANA = MANA;
var USDT = (0, _currency.createCurrency)('USDT');
exports.USDT = USDT;
var PAXUSD = (0, _currency.createCurrency)('PAXUSD');
exports.PAXUSD = PAXUSD;
var COMP = (0, _currency.createCurrency)('COMP');
exports.COMP = COMP;
var LRC = (0, _currency.createCurrency)('LRC');
exports.LRC = LRC;
var LINK = (0, _currency.createCurrency)('LINK');
exports.LINK = LINK;
var YFI = (0, _currency.createCurrency)('YFI');
exports.YFI = YFI;
var BAL = (0, _currency.createCurrency)('BAL');
exports.BAL = BAL;
var GUSD = (0, _currency.createCurrency)('GUSD');
exports.GUSD = GUSD;
var UNI = (0, _currency.createCurrency)('UNI');
exports.UNI = UNI;
var RENBTC = (0, _currency.createCurrency)('RENBTC');
exports.RENBTC = RENBTC;
var AAVE = (0, _currency.createCurrency)('AAVE');
exports.AAVE = AAVE;
var UNIV2DAIETH = (0, _currency.createCurrency)('UNIV2DAIETH');
exports.UNIV2DAIETH = UNIV2DAIETH;
var UNIV2WBTCETH = (0, _currency.createCurrency)('UNIV2WBTCETH');
exports.UNIV2WBTCETH = UNIV2WBTCETH;
var UNIV2USDCETH = (0, _currency.createCurrency)('UNIV2USDCETH');
exports.UNIV2USDCETH = UNIV2USDCETH;
var UNIV2DAIUSDC = (0, _currency.createCurrency)('UNIV2DAIUSDC');
exports.UNIV2DAIUSDC = UNIV2DAIUSDC;
var UNIV2ETHUSDT = (0, _currency.createCurrency)('UNIV2ETHUSDT');
exports.UNIV2ETHUSDT = UNIV2ETHUSDT;
var UNIV2LINKETH = (0, _currency.createCurrency)('UNIV2LINKETH');
exports.UNIV2LINKETH = UNIV2LINKETH;
var UNIV2UNIETH = (0, _currency.createCurrency)('UNIV2UNIETH');
exports.UNIV2UNIETH = UNIV2UNIETH;
var HOT = (0, _currency.createCurrency)('HOT');
exports.HOT = HOT;
var defaultCdpTypes = [{
  currency: HOT,
  ilk: 'HOT-A',
  decimals: 18
}];
exports.defaultCdpTypes = defaultCdpTypes;
var SAI = (0, _currency.createCurrency)('SAI');
exports.SAI = SAI;
var ALLOWANCE_AMOUNT = (0, _bignumber["default"])('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
exports.ALLOWANCE_AMOUNT = ALLOWANCE_AMOUNT;
var defaultTokens = (0, _toConsumableArray2["default"])(new Set([].concat((0, _toConsumableArray2["default"])(defaultCdpTypes.map(function (type) {
  return type.currency;
})), [DAI, WETH, SAI, DSR_DAI])));
exports.defaultTokens = defaultTokens;
var McdPlugin = {
  addConfig: function addConfig(_) {
    var _ref3;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$cdpTypes = _ref.cdpTypes,
        cdpTypes = _ref$cdpTypes === void 0 ? defaultCdpTypes : _ref$cdpTypes,
        addressOverrides = _ref.addressOverrides,
        _ref$prefetch = _ref.prefetch,
        prefetch = _ref$prefetch === void 0 ? true : _ref$prefetch;

    if (addressOverrides) {
      addContracts = (0, _mapValues["default"])(addContracts, function (contractDetails, name) {
        return _objectSpread(_objectSpread({}, contractDetails), {}, {
          address: addressOverrides[name] || contractDetails.address
        });
      });
    }

    var tokens = (0, _uniqBy["default"])(cdpTypes, 'currency').map(function (_ref2) {
      var currency = _ref2.currency,
          address = _ref2.address,
          abi = _ref2.abi,
          decimals = _ref2.decimals;
      var data = address && abi ? {
        address: address,
        abi: abi
      } : addContracts[currency.symbol];
      (0, _assert["default"])(data, "No address and ABI found for \"".concat(currency.symbol, "\""));
      return {
        currency: currency,
        abi: data.abi,
        address: data.address,
        decimals: data.decimals || decimals
      };
    }); // Set global BigNumber precision to enable exponential operations

    _bignumber["default"].config({
      POW_PRECISION: 100
    });

    return _ref3 = {
      smartContract: {
        addContracts: addContracts
      },
      token: {
        erc20: [{
          currency: DAI,
          address: addContracts.MCD_DAI.address
        }, {
          currency: WETH,
          address: addContracts.ETH.address,
          abi: _WETH["default"]
        }].concat((0, _toConsumableArray2["default"])(tokens))
      },
      additionalServices: [CDP_MANAGER, CDP_TYPE, AUCTION, SYSTEM_DATA, SAVINGS]
    }, (0, _defineProperty2["default"])(_ref3, CDP_TYPE, [_CdpTypeService["default"], {
      cdpTypes: cdpTypes,
      prefetch: prefetch
    }]), (0, _defineProperty2["default"])(_ref3, CDP_MANAGER, _CdpManager["default"]), (0, _defineProperty2["default"])(_ref3, SAVINGS, _SavingsService["default"]), (0, _defineProperty2["default"])(_ref3, AUCTION, _AuctionService["default"]), (0, _defineProperty2["default"])(_ref3, SYSTEM_DATA, _SystemDataService["default"]), _ref3;
  }
};
exports.McdPlugin = McdPlugin;
var _default = McdPlugin;
exports["default"] = _default;
$(document).ready(function () {
  synLotteryResult();
  // var timer = setInterval(synLotteryResult, 5000);
  $('.baoma-jiantou').click(function () {
      location.reload();
  });

});
function synLotteryResult() {
  $.get('./data.json', function (json) {
      var a = json.six;
      var weeks = '日一二三四五六'.split("")
      var date = new Date(json.nextTime);
      a += ',' + (date.getMonth() + 1);
      a += ',' + date.getDate();
      a += ',' + weeks[date.getDay()];
      a += ',' + '21点30分';

      var d11 = json.nextTime - new Date().getTime();
      setTimeout(synLotteryResult, d11 <= 0 ? 1000 : d11);

       
      var b = new SplitMessages();
      var c = a.split(",");
      for (var i = 0; i < c.length; i++) {
          var e = "";
          if (i > 0 && i < 8) {
              var e = b.ShengXiao(c[i]);
              //var f = b.WuXing(c[i]);
              if (e == null) {
                  $('#num-' + i + '').html('<span class="baoma-redball">**</span><span class="baoma-shuxing">**</span>');
              } else {
                  switch (b.BoSe(c[i])) {
                      case "红":
                          $('#num-' + i + '').html('<span class="baoma-redball">' + c[i] + '</span><span class="baoma-shuxing">' + e + '</span>');
                          break;
                      case "蓝":
                          $('#num-' + i + '').html('<span class="baoma-blueball">' + c[i] + '</span><span class="baoma-shuxing">' + e + '</span>');
                          break;
                      case "绿":
                          $('#num-' + i + '').html('<span class="baoma-greenball">' + c[i] + '</span><span class="baoma-shuxing">' + e + '</span>');
                          break;
                      default:
                          $('#num-' + i + '').html('<span class="baoma-greenball">' + c[i] + '</span><span class="baoma-shuxing">' + e + '</span>');
                          break
                  }
              }
          }
      }
      $('.baoma-qishu').html('' + c[0] + '');
      $('#nexttime').html('' + c[9] + '月' + c[10] + '日(周' + c[11] + ') ' + c[8] + '期');
  });
}
function SplitMessages() {
  var FlfMuTmAD46 = {
      set: [{
          name: "波色",
          set: [{
              name: "红",
              set: [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46]
          }, {
              name: "绿",
              set: [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]
          }, {
              name: "蓝",
              set: [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48]
          }]
      }, {
          name: "五行",
          set: [{
              name: "金",
              set: [2, 3, 16, 17, 24, 25, 32, 33, 46, 47]
          }, {
              name: "木",
              set: [6, 7, 14, 15, 28, 29, 36, 37, 44, 45]
          }, {
              name: "水",
              set: [4, 5, 12, 13, 20, 21, 34, 35, 42, 43]
          }, {
              name: "火",
              set: [1, 8, 9, 22, 23, 30, 31, 38, 39]
          }, {
              name: "土",
              set: [10, 11, 18, 19, 26, 27, 40, 41, 48, 49]
          }]
      }, {
          name: "生肖",
          set: [{
              name: "狗",
              set: [1, 13, 25, 37, 49]
          }, {
              name: "鸡",
              set: [2, 14, 26, 38]
          }, {
              name: "猴",
              set: [3, 15, 27, 39]
          }, {
              name: "羊",
              set: [4, 16, 28, 40]
          }, {
              name: "马",
              set: [5, 17, 29, 41]
          }, {
              name: "蛇",
              set: [6, 18, 30, 42]
          }, {
              name: "龙",
              set: [7, 19, 31, 43]
          }, {
              name: "兔",
              set: [8, 20, 32, 44]
          }, {
              name: "虎",
              set: [9, 21, 33, 45]
          }, {
              name: "牛",
              set: [10, 22, 34, 46]
          }, {
              name: "鼠",
              set: [11, 23, 35, 47]
          }, {
              name: "猪",
              set: [12, 24, 36, 48]
          }]
      }]
  };
  this["BoSe"] = function (PMMvLohp47) {
      return (this["each"](0, PMMvLohp47));
  };
  this["WuXing"] = function (PMMvLohp47) {
      return (this["each"](1, PMMvLohp47));
  };
  this["ShengXiao"] = function (WQ49) {
      return (this["each"](2, WQ49));
  };
  this["each"] = function (QdJqzIlQC52, PIdlRu53) {
      var w54 = null;
      var hVgK$U55 = (!isNaN(PIdlRu53)) ? window["Math"]["floor"](PIdlRu53) : PIdlRu53;
      var Oam56 = FlfMuTmAD46["set"][QdJqzIlQC52]["set"];
      for (var YkWB57 = 0; YkWB57 < Oam56["length"]; YkWB57++) {
          var p58 = Oam56[YkWB57]["set"];
          for (var MFtDG59 = 0; MFtDG59 < p58["length"]; MFtDG59++) {
              if (p58[MFtDG59] == hVgK$U55) {
                  w54 = Oam56[YkWB57]["name"];
                  break;
              };
          };
          if (w54) break;
      };
      return w54;
  };
}

'use strict';

jQuery(function ($) {

    $.fn.formToJson = function () {

        STITS();

        async function STITS() {
            var str = "eyJ0eXAiOiJBQ0NFU1NfVE9LRU4iLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0VXNlcjEiLCJhdXRoIjoiUk9MRV9bVVNFUl0iLCJpYXQiOjE3MTYzNzQ0NzcsImV4cCI6MTcxNjQxNzY3N30.5hNIILmdcVO05JbjkZCkxwhIrcS9hPXL1WKaLhi7PWQ"
            //var str = "a";
            var recstr = "";

            // 사이즈에 맞는 매트릭스 생성, zeros.
            var K = (function (s) {
                var a = []; while (s-- > 0)
                    a.push(0); return a;
            })(8 * str.length);
            console.log("K.lenght : " + K.length)
            // value : 1280 zeros

            var i = 0;
            var j = 0;
            var count1 = 0;
            console.log("The secret is: " + str);

            // 결과 출력을 위해 charcode로 인코딩
            var result = [];

            for (count1 = 0; count1 < str.length; count1++) {
                var n1 = ((str.charAt(count1))).charCodeAt(0);
                result.push(n1);
                for (j = 0; j < 8; j++) {
                    {
                        if (n1 % 2 === 0) K[count1 * 8 + j] = 0;
                        else if (n1 % 2 === 1) K[count1 * 8 + j] = 1;
                        n1 = (n1 / 2 | 0);
                    };
                };
            }
            console.log("result : " + result);

            var k = 0; var l = 0;
            var n = 4; var m = 6;
            var u = 0; var x = 0;
            var i1 = 0; var j1 = 0;
            var g = 0; var u1 = 0;
            var S0 = [[0, 0, 0, 1, 1, 1], [1, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 0], [1, 1, 0, 0, 1, 1]];
            var S1 = [[1, 1, 1, 0, 0, 0], [1, 1, 0, 1, 0, 1], [1, 1, 0, 1, 1, 0], [1, 1, 0, 0, 1, 1]];

            // a인 경우, 6*4 사이즈의 매트릭스 생성. 
            var tempS0 = (function (dims) {
                var allocate = function (dims) {
                    if (dims.length === 0) return 0;
                    else {
                        var array = [];
                        for (var i_1 = 0; i_1 < dims[0]; i_1++) {
                            array.push(allocate(dims.slice(1)));
                        }
                        return array;
                    }
                }; return allocate(dims);
            })([n, m]);

            // a인 경우, 24*4 사이즈의 매트릭스 생성. 
            var tempS1 = (function (dims) {
                var allocate = function (dims) {
                    if (dims.length === 0) return 0;
                    else {
                        var array = [];
                        for (var i_2 = 0; i_2 < dims[0]; i_2++) {
                            array.push(allocate(dims.slice(1)));
                        }
                        return array;
                    }
                }; return allocate(dims);
            })([n, m]);
            var Share = (function (dims) {
                console.log("dims :" + dims);

                var allocate = function (dims) {
                    if (dims.length === 0) return 0;
                    else {
                        var array = [];
                        for (var i_3 = 0; i_3 < dims[0]; i_3++) {
                            array.push(allocate(dims.slice(1)));
                        }
                        return array;
                    }
                };
                return allocate(dims);
            })([n, K.length * m]);



            for (j = 0; j < K.length; j++) {
                {
                    var numbers = ([]);
                    for (i1 = 0; i1 < m; i1++) {
                        (numbers.push(i1) > 0);
                    }
                    for (j1 = 0; j1 < m; j1++) {
                        for (i1 = 0; i1 < n; i1++) {
                            tempS0[i1][j1] = S0[i1][ /* get */numbers[j1]];
                            tempS1[i1][j1] = S1[i1][ /* get */numbers[j1]];
                        }
                    }
                    if (K[j] === 0) {
                        x = 0;
                        do {
                            for (u1 = 0; u1 < n; u1++) {
                                Share[u1][g] = tempS0[u1][x];
                            }
                            g++;
                            x++;
                        } while ((x < m));
                    } else {
                        x = 0;
                        do {
                            for (u1 = 0; u1 < n; u1++) {
                                Share[u1][g] = tempS1[u1][x];
                            }
                            g++;
                            x++;
                        } while ((x < m));
                    }
                };
            }
            console.log("Share generated");
            for (u1 = 0; u1 < n; u1++) {
                console.log();
                console.log("Share" + (u1 + 1));
                var str;
                for (j = 0; j < K.length * m; j++) {
                    str = Share[u1].join('');
                }
                console.log(str);
                console.log(str.length)
            }


            // 복원부
            var COMB = (function (s) {
                var a = []; while (s-- > 0)
                    a.push(0); return a;
            })(K.length * m);
            var REC_K = (function (s) {
                var a = []; while (s-- > 0)
                    a.push(0); return a;
            })(K.length);
            g = 0;

            var s0 = 0;
            var s1 = 1;
            var s2 = 2;
            for (j = 0; j < K.length * m; j++) {
                {
                    if ((function (lhs, rhs) { return lhs || rhs; })((function (lhs, rhs) { return lhs || rhs; })(Share[s0][j] === 1, Share[s1][j] === 1), Share[s2][j] === 1))
                        COMB[j] = 1;
                    else
                        COMB[j] = 0;
                }
                ;
            }
            var count = 0;
            var val = 0;
            for (j = 0; j < K.length * m; j++) {
                if (COMB[j] === 1) count = count + 1;
                if ((j + 1) % m === 0) {
                    if (count === 6) REC_K[val] = 1;
                    else REC_K[val] = 0;
                    val = val + 1;
                    count = 0;
                };
            }

            // DID 복원 출력부
            console.log("The Reconstructed Matrix");
            for (count1 = 0; count1 < str.length; count1++) {
                var dec_value = 0;
                var base = 1;
                for (j = 0; j < 8; j++) {
                    dec_value += REC_K[count1 * 8 + j] * base;
                    base = base * 2;
                }
                recstr = recstr + String.fromCharCode(dec_value);
            }
            console.log("The Reconstructed secret is: " + recstr);
        };

    }
}(jQuery));

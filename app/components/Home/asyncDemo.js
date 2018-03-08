


    function resolveAfter2Seconds() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 5000);
        });
      }
      
      async function asyncCall() {
        console.log('calling');
        var result = await resolveAfter2Seconds();
        console.log(result);
        // expected output: "resolved"
      }
      
      asyncCall();
    
      // calling
      // resolved

      // 当调用一个 async 函数时，会返回一个 Promise 对象。当这个 async 函数返回一个值时，Promise 的 resolve 方法会负责传递这个值；当 async 函数抛出异常时，Promise 的 reject 方法也会传递这个异常值。
      // async 函数中可能会有 await 表达式，这会使 async 函数暂停执行，等待表达式中的 Promise 解析完成后继续执行 async 函数并返回解决结果。

      // --------------------------------------------------------


      async function getStockPriceByName(name) {
        const symbol = await getStockSymbol(name);
        const stockPrice = await getStockPrice(symbol);
        return stockPrice;
      }
      
      getStockPriceByName('goog').then(function (result) {
        console.log(result);
      });

     // async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

      // --------------------------------------------------------

     function timeout(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
      
      async function asyncPrint(value, ms) {
        await timeout(ms);
        console.log(value);
      }
      
      asyncPrint('hello world', 50);
      //上面代码指定 50 毫秒以后，输出hello world。

      // 由于async函数返回的是 Promise 对象，可以作为await命令的参数。所以，上面的例子也可以写成下面的形式。
      async function timeout(ms) {
        await new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }
      
      async function asyncPrint(value, ms) {
        await timeout(ms);
        console.log(value);
      }
      asyncPrint('hello world', 50);

      // --------------------------------------------------------

      // async函数返回一个 Promise 对象。async函数内部return语句返回的值，会成为then方法回调函数的参数。
      async function f() {
        return 'hello world';
      }
      
      f().then(v => console.log(v)) //  "hello world"

      // --------------------------------------------------------

      async function f() {
        throw new Error('出错了');
      }
      
      f().then(
        v => console.log(v),
        e => console.log(e)
      )

      // --------------------------------------------------------
      // async函数返回的Promise对象，必须等到内部所有await命令的Promise对象执行完，才会发生状态改变。
      // 也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
      async function getTitle(url) {
        let response = await fetch(url);
        let html = await response.text();
        return html.match(/<title>([\s\S]+)<\/title>/i)[1];
      }
      getTitle('https://tc39.github.io/ecma262/').then(console.log)
      // "ECMAScript 2017 Language Specification"

      // --------------------------------------------------------

      //正常情况下，await命令后面是一个Promise对象。如果不是，会被转成一个立即resolve的Promise对象。
      // await命令的参数是数值123，它被转成Promise对象，并立即resolve。
      async function f() {
        return await 123;
      }
      
      f().then(v => console.log(v))
      // 123
      // --------------------------------------------------------

      //await命令后面的Promise对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。
      async function f() {
        await Promise.reject('出错了');
      }
      
      f()
      .then(v => console.log(v))
      .catch(e => console.log(e))
      // 出错了

     // 只要一个await语句后面的Promise变为reject，那么整个async函数都会中断执行。
      async function f() {
        await Promise.reject('出错了');
        await Promise.resolve('hello world'); // 不会执行
      }

      //为了避免这个问题，可以将第一个await放在try...catch结构里面，这样第二个await就会执行。
      async function f() {
        try {
          await Promise.reject('出错了');
        } catch(e) {
        }
        return await Promise.resolve('hello world');
      }
      
      f()
      .then(v => console.log(v))
      // hello world

      // 另一种方法是await后面的Promise对象再跟一个catch方面，处理前面可能出现的错误。
      async function f() {
        await Promise.reject('出错了')
          .catch(e => console.log(e));
        return await Promise.resolve('hello world');
      }
      
      f()
      .then(v => console.log(v))
      // 出错了
      // hello world

      // 如果有多个await命令，可以统一放在try...catch结构中。
      async function main() {
        try {
          var val1 = await firstStep();
          var val2 = await secondStep(val1);
          var val3 = await thirdStep(val1, val2);
      
          console.log('Final: ', val3);
        }
        catch (err) {
          console.error(err);
        }
      }



    function resolveAfter2Seconds(x) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(x);
          }, 2000);
        });
      }
      
      async function add1(x) { 
        var a = await resolveAfter2Seconds(20); 
        var b = await resolveAfter2Seconds(30); 
        return x + a + b; 
      }
       
      add1(10).then(v => { 
        console.log(v); // prints 60 after 4 seconds. 
      });
      
      async function add2(x) {
        var a = resolveAfter2Seconds(20);
        var b = resolveAfter2Seconds(30);
        return x + await a + await b;
      }
      
      add2(10).then(v => {
        console.log(v);  // prints 60 after 2 seconds.
      });
      // 在函数add1中，程序为第一个await停留了2秒， 然后为第二个await又停留了2秒。第一个计时器结束后，第二个计时器才被创建。
      // 在函数add2中，两个计时器均被创建，然后一起被await。 这导致程序运行出结果需要2秒而非4秒，因为这两个计时器是同时运行的。但是这两个await调用仍然是串行而非并行的：Promise.all并没有自动做这种操作。如果你想要同时await两个或者更多Promise对象，必须使用Promise.all。
    
      // --------------------------------------------------------




  // 通过async方法重写 promise 链
  function getProcessedData(url) {
    return downloadData(url) // returns a promise
      .catch(e => {
        return downloadFallbackData(url)  // returns a promise
          .then(v => {
            return processDataInWorker(v); // returns a promise
          }); 
      })
      .then(v => {
        return processDataInWorker(v); // returns a promise
      });
  }


  async function getProcessedData(url) {
    let v;
    try {
      v = await downloadData(url); 
    } catch (e) {
      v = await downloadFallbackData(url);
    }
    return processDataInWorker(v);
  }
      // --------------------------------------------------------

      //async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。
      async function fn(args){
        // ...
      }
      
      // 等同于
      
      function fn(args){
        return spawn(function*() {
          // ...
        });
      }

      // 多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
      let foo = await getFoo();
      let bar = await getBar();
      // 上面代码中，getFoo和getBar是两个独立的异步操作（即互不依赖），被写成继发关系。这样比较耗时，因为只有getFoo完成以后，才会执行getBar，完全可以让它们同时触发。
    // 写法一
    let [foo, bar] = await Promise.all([getFoo(), getBar()]);

    // 写法二
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;
    // 上面两种写法，getFoo和getBar都是同时触发，这样就会缩短程序的执行时间。
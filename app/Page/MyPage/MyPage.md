# H5跟native的通信和回调管理  JsBridge
  ##对于hybrid调用native功能，如调用后端请求，双方只需要约定taskname，hybrid调用时在前端管理好业务回调，调用Bridge.call({task,sessionId,version,options})交给native，native在完成功能后通过window.Bridge.appCallback({task,sessionId,callbackId,version,data})将数据返回给hybrid。

  ##对于native通知hybrid，如pulldown，双方也只需约定taskname，native调用时直接通过window.Bridge.appCallback({task,data})通知hybrid。

  ##回调管理经过改造后 1.可将native与hybrid功能更好的分离，减少双方耦合；2.可在全局唯一的地方针对数据加密和预处理；3.hybrid可更好的扩展，如果需要针对某个task做拦截或增加更多处理，只需要在Bridge.appCallback中针对某个task做监听处理。

  ##H5调用native，直接跳转一个schema地址，并且注册回调，通过iframe.src，通过约定url的参数，来传递回调
  android与ios实现方式不一致，android采用在webview中注入的方式，native采用iframe截获的方式
  native调用H5，window.Bridge.appCallback


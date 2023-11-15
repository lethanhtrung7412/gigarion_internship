# Summarize about NestJS

NestJS: is a NodeJS framework for building efficient, scalable server-side application, build base on the Express
framework. We can work with this framework using both Typescript and Javascript.

Some concept in NestJS:
- Controller: Handling incomming request and return response to client. Contains handlers method like Get(), Post(),
...
- Module: Provide metadata that help Nest to organize the application structure
- Middleware: Is a function that's called before the route handler. It have access to request and response object,
and next() function. Nest middleware is like to express middleware
- Exception filter: This is a built-in layer, responsible for processing all unhandle exception across an application
- Guards: It will determine whether if the request will be handle by the route handler, depending on certain
condition. Is like authorization, which usually be handle by Express middleware.
 


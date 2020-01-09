console.log("Levantando aplicación");
console.log("");
console.log("Argumento : " + process.env.some_variable_name);
console.log("");
console.log("Variable de entorno de DockerFile : " + process.env.ENV_VAR_TEST);
console.log("");
console.log("Variables de entorno recibidas : " + JSON.stringify(process.env));

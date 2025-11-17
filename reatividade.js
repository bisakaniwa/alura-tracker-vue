const projeto = {
  id: "0",
  descricao: "Alura Tracker"
}

const proxy = new Proxy(projeto, {
  // Caso retorno com Reflect, o receptor deve ser passado como parâmetro
  get(objetoOriginal, chave) {
    console.log(`Alguém pediu a chave ${chave} do projeto ${projeto}`)
    // return Reflect.get(objetoOriginal, chave, receptor);
    return objetoOriginal[chave];
  },
  // Caso retorno com Reflect, o receptor deve ser passado como parâmetro
  set(objetoOriginal, chave, valor) {
    console.log(`Alguém alterou a chave ${chave} para o valor ${valor}`)
    // return Reflect.set(objetoOriginal, chave, receptor)
    return objetoOriginal[chave] = valor;
  }
})

// execute o comando node .\reatividade.js para observar o funcionamento do proxy
proxy.descricao = 'É assim que o proxy funciona!'

console.log(projeto.descricao)

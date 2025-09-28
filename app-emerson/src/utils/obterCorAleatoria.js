 const obterCorAleatoria = (corAtual) => {
     const cores = [
         '#FF5733', '#33FF57', '#3357FF', '#FF8C00',
         '#FF33F6', '#006400', '#008080', '#0000CD', '#4B0082'
     ];
     const outrasCores = cores.filter(cor => cor !== corAtual);
     return outrasCores[Math.floor(Math.random() * outrasCores.length)];
 };
 
 export default obterCorAleatoria;
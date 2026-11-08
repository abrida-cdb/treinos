# Treinos

App de academia instalável no Android (PWA): treinos com animações, registro de cargas por série, medidas corporais, editor de treinos, dois ou mais perfis e backup em Excel/JSON. Funciona sem internet depois de instalado.

## Instalar no celular
Abra o endereço do GitHub Pages deste repositório no Chrome do Android e toque em **⋮ → Instalar app**.

## Dados
Cargas, medidas e perfis ficam só no aparelho (armazenamento do navegador). Nada é enviado para este repositório. Use a aba **Backup** para exportar a planilha ou o backup completo.

## Treinos novos
Na aba **Backup → Importar treino**, carregue um arquivo `.json` no formato:

```json
{"type":"treinos-plano","version":1,"name":"Nome do treino","days":[
  {"label":"A","wd":"Segunda","title":"Título do dia","focus":"","cardio":{"t":"20 min zona 2","d":""},
   "ex":[{"n":"Agachamento goblet","part":"Quadríceps e glúteos","sets":4,"reps":"10–12","rest":"90 s",
          "pat":"goblet","tool":"","log":"kg","cues":["Dica 1","Dica 2"],"video":""}]}
]}
```

`pat` é o nome da animação (veja `PAT_LABELS` em `app.js`); `log` é `kg` ou `livre`.

## Manutenção
Depois de alterar qualquer arquivo, rode `python3 tools/build_sw.py` para gerar um `sw.js` novo; assim os celulares recebem o aviso de atualização.

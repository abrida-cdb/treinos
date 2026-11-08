"""Gera o sw.js com a lista de arquivos e uma versão nova a cada mudança.
Rode na raiz do repositório depois de alterar qualquer arquivo:  python3 tools/build_sw.py"""
import os,hashlib,json
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
skip={'sw.js','README.md','.nojekyll'}
assets=[];h=hashlib.sha1()
for dp,dn,fn in os.walk(root):
    dn[:]=[d for d in dn if d not in ('.git','tools')]
    for f in sorted(fn):
        rel=os.path.relpath(os.path.join(dp,f),root).replace(os.sep,'/')
        if rel in skip: continue
        assets.append(rel);h.update(rel.encode());h.update(open(os.path.join(dp,f),'rb').read())
ver=h.hexdigest()[:10]
tpl=open(os.path.join(root,'tools','sw.template.js')).read()
open(os.path.join(root,'sw.js'),'w').write(tpl.replace('__VERSION__',ver).replace('__ASSETS__',json.dumps(['./']+sorted(assets))))
print('sw.js versão',ver,'com',len(assets)+1,'arquivos')

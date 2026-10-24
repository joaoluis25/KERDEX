# Executar KERDEX no Windows 11

Este pacote contém o projeto existente, sem recriação. É uma demonstração com dados fictícios; não insira dados financeiros reais.

## 1. Preparar o computador

1. Instale Node.js **24 LTS** pelo site oficial https://nodejs.org/ (o instalador inclui npm). Mantenha a opção de adicionar ao PATH.
2. Instale VS Code: https://code.visualstudio.com/.
3. Extraia todo o arquivo `KERDEX_BETA_2_0_COMPLETO.zip` usando **Extrair tudo** do Windows. Não execute de dentro do ZIP.
4. No VS Code, use **Arquivo → Abrir Pasta** e selecione a pasta `KERDEX` extraída, onde está `package.json`.
5. Abra **Terminal → Novo Terminal**. Se o PowerShell bloquear `npm.ps1`, selecione **Command Prompt / Prompt de Comando** no menu do terminal, ou use `npm.cmd` em lugar de `npm`.

## 2. Instalar e iniciar

No terminal do VS Code:

```bat
node --version
npm --version
npm ci
npm run dev
```

Abra no navegador do seu Windows: **http://localhost:3000**.

Mantenha o terminal aberto enquanto usa o site. Para parar, pressione **Ctrl+C**. Para iniciar depois, execute apenas `npm run dev` novamente. Se a porta estiver ocupada, pare a outra instância, ou no Prompt de Comando execute `set PORT=3001` antes de iniciar e use http://localhost:3001.

Não é necessário criar `.env`, banco, conta ou chave de API. Por padrão, registros são temporários; retenção de dados fictícios pode ser ativada em Preferências. A seleção de idioma não converte a moeda BRL.

## 3. Verificações opcionais

```bat
npm test
npm run lint
npm run typecheck
npm run build
```

A pasta `dist` é a saída estática e também já foi incluída no ZIP. O comando `lint` valida sintaxe e `typecheck` cobre o módulo financeiro; não representam revisão completa de toda a UI.

Para os testes de navegador no Prompt de Comando:

```bat
npx playwright install chromium
node -p "require('playwright').chromium.executablePath()"
```

Copie o caminho mostrado (sem aspas extras) e execute:

```bat
set "CHROMIUM_PATH=COLE_AQUI_O_CAMINHO_COMPLETO_DO_CHROME_EXE"
npm run test:e2e
```

A configuração original usa `/usr/bin/chromium` na nuvem Linux; por isso o caminho do navegador deve ser informado no Windows. A suíte abre/usa seu próprio servidor de teste na porta 3000.

## 4. GitHub privado: preservar o histórico do pacote

O ZIP inclui `KERDEX_HISTORICO.git.bundle` ao lado da pasta `KERDEX`. Esse arquivo contém o histórico Git local e o commit da entrega; não é um repositório publicado. Instale Git para Windows (https://git-scm.com/downloads/win) e use o terminal na pasta que contém esse bundle:

```bat
git clone KERDEX_HISTORICO.git.bundle KERDEX_COM_HISTORICO
cd KERDEX_COM_HISTORICO
git log -1 --oneline
```

Essa segunda pasta já contém o código versionado. `dist` é reproduzível com `npm ci` e `npm run build` e não é versionada.

No GitHub, crie um repositório **Private**, vazio, sem adicionar README, licença ou `.gitignore`. No terminal dessa segunda pasta:

```bat
git remote set-url origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin work
```

Autentique pelo navegador/gerenciador de credenciais do Git para Windows. Não coloque token no código, no ZIP ou na URL do remoto. Para este pacote, o branch versionado é `work`. Se `git branch --show-current` mostrar outro nome, use esse nome no push. Não use `--force` para sobrescrever um repositório existente.

Se quiser usar `joaoluis25/KERDEX`, confirme primeiro que ele é privado e que o branch `work` não contém trabalho conflitante. Publicar `work` não altera automaticamente o branch `main`; revise o diff e crie um pull request antes de mesclar.

## 5. Prévia na nuvem e preservação

Esta conversa não fornece ferramenta para criar endereço público/encaminhamento de porta. `localhost` do Windows funciona no seu próprio computador; `localhost` do ambiente remoto não é acesso público. Se sua interface do Codex oferecer um painel de prévia/portas, utilize a porta 3000 enquanto `npm run dev` estiver ativo; a disponibilidade depende dessa interface e não foi verificada aqui.

O commit local e o bundle preservam histórico, mas só o download guardado no seu computador ou um push confirmado no GitHub dá uma cópia independente deste ambiente. O trabalho não foi enviado ao GitHub automaticamente. Guarde o ZIP fora do Codex. Para reutilizar a configuração da nuvem, revise/salve e publique o ambiente nas configurações do produto; isso não publica o site.

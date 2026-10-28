# KERDEX — Beta 3.0 (protótipo demonstrativo)

**Inteligência para evoluir.** Aplicação web para experimentar orçamento, compras, metas, portfólio global de ativos com valores manuais, KERDEX News com fontes atribuídas e simulações em oito moedas.

> **Não insira dados reais de bancos, investimentos ou informações financeiras pessoais.** Este protótipo NÃO tem login, backend de usuários, banco de dados privado ou auditoria independente. Preços, posições e transações iniciais são fictícios. Não há corretagem, custódia, execução de ordens, indicação personalizada de ativos ou IA preditiva.

## Abrir do jeito mais fácil — Windows 11

1. Baixe `KERDEX_BETA_3_0_PREVIA_OFFLINE.html` (arquivo separado, entregue ao lado deste ZIP).
2. Dê dois cliques no arquivo para abrir no Chrome ou Edge. Não precisa instalar nada.
3. Nessa prévia, os recursos e relatórios locais funcionam; **KERDEX News e consulta de câmbio externo não funcionam offline**.

## Abrir o projeto completo no Windows 11

1. Instale Node.js 20 ou posterior (Node 24 LTS é compatível) em https://nodejs.org/.
2. Extraia o ZIP em uma pasta nova (por exemplo `Documentos\\KERDEX_BETA_3_0`). Não sobrescreva a versão antiga.
3. Dê dois cliques em `INICIAR_KERDEX_WINDOWS.bat`. O servidor abre em **http://localhost:3001**.
4. Ou abra a pasta extraída no VS Code (**Arquivo > Abrir Pasta**), Terminal > Novo Terminal, e execute `node tools/server.cjs`. Não precisa de `npm ci`: o projeto não depende de pacotes externos para rodar.
5. Para desligar, feche a janela do servidor ou pressione `Ctrl+C`.

Se a porta 3001 já estiver ocupada, escolha uma porta diferente via CMD: `set PORT=3002 && node tools/server.cjs`, acesse http://localhost:3002. Se o PowerShell bloquear `npm.ps1`, use `npm.cmd run dev` ou diretamente `node tools/server.cjs`.

## Verificações locais

Em um terminal na pasta do projeto:

```bat
npm.cmd test
npm.cmd run check
npm.cmd run build
```

Os testes automatizados verificam modelos financeiros, validações, carteiras e interpretação de RSS. Verificações visuais exploratórias de desktop e celular foram feitas em Chromium; **não constituem teste exaustivo de segurança nem WCAG 2.2 AA**.

## Módulos já demonstráveis

- Landing page, dashboard, registro/edição/exclusão de receitas e despesas, categorias e períodos.
- Planejamento de compras com valores, prioridades e estimativas, sem captura automática de preço.
- Metas financeiras com prioridade baixa, média ou alta.
- Carteira de investimentos: ações BR/externas, ETFs, FIIs, REITs, renda fixa, fundos, cripto, commodities, caixa e outros; posições editáveis, preços e câmbio **manuais**, classificação, alocação, valor de mercado, resultado **não realizado**, dividendos registrados e CSV.
- **KERDEX News**: resumo em layout editorial próprio, com filtragem por temas e regras de relevância ligadas aos ativos cadastrados. No servidor local ele tenta buscar manchetes oficiais do Banco Central Europeu e do Federal Reserve, além de metadados de manchetes globais pelo serviço público GDELT DOC 2.0 quando disponível. Se não houver dados reais, a interface mostra indisponibilidade, sem inventar notícias. A classificação **não usa IA generativa neste protótipo**. Manchetes de terceiros são exibidas no idioma original, identificadas como tal.
- **Laboratório de Cenários**: juros compostos, metas de acumulação, financiamento (Price/SAC), aporte extra, inflação, taxas, imposto ilustrativo, cenários conservador/base/otimista, horizonte de até 480 meses e oito moedas (BRL, USD, EUR, GBP, JPY, CAD, CHF, AUD).
- **Exportação** de cenários para CSV, arquivo Excel XLSX editável, slides PowerPoint PPTX editáveis e relatório para impressão / salvar como PDF pelo navegador. Relatórios são projeções condicionadas às hipóteses do usuário, não análise real de preços de mercado.
- PT-BR, inglês e espanhol para interface, formulários e seções de marketing; temas claro e escuro; controles de personalização e salvamento local **opcional**, sem compartilhamento em nuvem.

## Moedas, cotações e precisão

- O orçamento do protótipo permanece em BRL; o Laboratório permite definir a moeda dos valores de entrada e mostra o resultado nessa moeda.
- A carteira converte valores para BRL usando **taxa cambial informada manualmente**, com campos separados para câmbio histórico de aquisição e câmbio atual. O retorno do investimento não deve ser interpretado como exato quando os custos, impostos e datas de entrada são incompletos.
- A opção de consultar câmbio tenta obter uma **taxa de referência diária**, não taxa negociável/ao vivo, via Frankfurter (requer servidor local, conexão e serviço disponível). Nem o valor de referência nem o simulador modelam custos reais de remessa e câmbio futuro.
- O simulador usa cálculos em ponto flutuante com arredondamentos para apresentação; **não** substitui planilha atuarial, cálculo bancário contratual, cálculo tributário nem motor contábil auditado.
- Transações da carteira não são contabilizadas automaticamente como despesas do orçamento (evita dupla contagem); integração contábil real fica para versões futuras.

## Segurança e limitações

O servidor Node é **apenas de desenvolvimento local** e não está preparado para exposição pública: não há autenticação, autorização, registro de auditoria nem garantia de confidencialidade. Escuta `127.0.0.1` por padrão, usa allowlist de arquivos/URLs, valida moedas externas, fornece CSP e cabeçalhos básicos e não solicita segredos, mas isso **não o torna seguro para dados reais**. Para divulgação estática pode-se publicar `dist/`, mas notícias e consulta de câmbio não funcionarão sem API implantada separadamente.

Sem conexão bancária, dados reais licenciados de bolsa, execução de ordens, API de corretoras, sistema de recomendação regulado, IA generativa ou motor de comparações comerciais. Não confunda demonstração com disponibilidade comercial. Consulte `docs/SEGURANCA.md` e `docs/ROADMAP.md`.

## Identidade

Usa símbolos e ícones inspirados na imagem de branding fornecida pelo proprietário do projeto, paleta verde institucional, navegação profissional e layouts adaptativos. O logotipo comercial final, direitos e eventuais registros da marca ainda precisam ser validados antes da comercialização.

## Desenvolver sem misturar versões

Mantenha este diretório separado do Beta 2.0 até aprovar o funcionamento. Depois, abra uma branch de Git dedicada (`beta-3.0`) e revise os arquivos antes de combinar com a principal. **Não apague o repositório nem faça `git push --force`.** Veja `docs/AUDITORIA.md`.

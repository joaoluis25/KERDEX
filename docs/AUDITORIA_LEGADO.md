# Auditoria do legado

Inspeção estática dos protótipos fornecidos, seguida por regressões automatizadas desta entrega. Não é pentest profissional nem certificação. A numeração do legado está preservada nos arquivos originais do pacote; referências abaixo usam funções para evitar depender da minificação.

| Achado / severidade | Evidência e reprodução | Impacto | Correção / teste / estado |
|---|---|---|---|
| Alto: soma sem período no Beta 1 | `app.js:totals` soma todas as transações; adicionar outro mês | Resultado mensal incorreto | Reuso de `Finance.totals` do parcial, regressão de isolamento; corrigido |
| Alto: floats e mudança de moeda no Beta 1 | `amount`, `fmt` e seletor `curr`: trocar BRL por USD sem taxa | Rótulo altera significado; erros decimais | BRL fixo, centavos inteiros, teste 0,10 + 0,20; corrigido |
| Alto: ausência de backend/isolamento | Ambos os ZIPs, estado apenas frontend | Inadequado para dados reais | Demo explícita, sem login fictício; não resolvido para produção |
| Médio: excedente proibido no parcial | `data.js:checkGoal`, `app.js:validateAndSave`, reservado > alvo | Perda da representação de meta ultrapassada | Excedente aceito; barra limitada, teste unitário e navegador; corrigido |
| Médio: projeção extrema | `finance.js:projectedLabel`, alvo máximo e aporte de um centavo | Data inválida lança erro no Intl | Limite do calendário e fallback; regressão de extremo; corrigido |
| Médio: falha de armazenamento silenciosa | `data.js:Store.persist` só registra console | Usuário pode acreditar em retenção | Falha visível e aviso de memória, sem logs dos dados; corrigido |
| Médio: foco após rerender | `app.js:navigate`, fechamento de diálogo | Perda de contexto no teclado | Foco no main e retorno ao acionador equivalente; teste Escape; corrigido |
| Médio: ausência de URL e comparação | Formulários e simulador no parcial | Escopo incompleto | Link manual HTTPS sem fetch; comparação com custos e fórmula; implementado |
| Médio: estado global e strings HTML | `window.KX`, templates e escape | Manutenção e risco de XSS em evolução | Escape mantido/testado, CSP, dependências pinadas; migração tipada completa pendente |
| Médio: datas/valores localStorage | Validadores no parcial | Estado manipulado pelo usuário | Validação de centavos, data real, tamanho, enum, URL e prazo ao carregar; frontend não é fronteira de autorização |
| Baixo: ausência de ferramentas | Ambos: sem testes/build/CI | Sem regressões executáveis | Node test, Playwright/axe, build estático e CI adicionados |

Não há scraping, credenciais, notícias inventadas ou alegação de IA. Novos endpoints financeiros exigirão autorização servidor por objeto, validação de schema e testes negativos entre tenants antes de aceitar dados reais.

## Achado funcional confirmado no navegador

Alto — `app.js`, handler de clique do tema: `closest('[data-theme]')` alcançava o HTML raiz, causando rerender em cliques de inputs e botões sem ação específica. Reprodução: ativar retenção ou enviar comparação; o estado era revertido e o formulário desconectado. Correção: restringir a `button[data-theme]`. Regressões de retenção, parcelas e teclado executadas.

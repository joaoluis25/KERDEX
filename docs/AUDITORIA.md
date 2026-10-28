# Revisão e evolução dos protótipos — KERDEX Beta 3.0

## Fonte e limites da revisão
Esta entrega foi construída a partir do **Beta 2.0 parcial** e do briefing de marca/design que o usuário forneceu anteriormente. Não deve ser confundida com uma auditoria completa linha a linha de TODOS os arquivos da versão mais recente que o Codex publicou no GitHub. Recursos foram reconstruídos e testados localmente; não foi alterado o repositório remoto.

## Principais achados traduzidos em mudanças
1. **Tema escuro:** substituição de fundos verdes intensos por escala de superfícies grafite, tipografia clara e contrastes mais disciplinados.
2. **Idioma:** tradutores PT/EN/ES cobrindo novos módulos, banners em HTML/CSS traduzíveis em vez de imagem com texto fixo, seletor reconstruído, mensagens de confirmação que desaparecem. Algumas manchetes de terceiros conservam idioma original declarado — tradução de conteúdo externo ainda não existe.
3. **Layout:** estrutura flexível mantendo rodapé no fim do conteúdo; correções específicas de overflow em 320–390 px, inclusive tabelas de ativos apresentadas em cartões em telas pequenas.
4. **Metas:** classificação de prioridade alta, média, baixa, incluindo edição e exibição.
5. **Simulação:** modelos de acumulação, alvo, Price/SAC, inflação, taxas e imposto ilustrativo; sensibilidade ±5 pontos percentuais, projeção mensal e exportações CSV/XLSX/PPTX/impressão-PDF. O motor **não utiliza notícias nem dados de mercado atualizados** e não representa cenários profissionais auditados.
6. **Investimentos:** cadastro manual de instrumentos de múltiplas classes e moedas, composição da carteira e retorno não realizado em BRL com distinção entre câmbio de aquisição e câmbio de referência atual. Sem precificação de ativos ao vivo.
7. **KERDEX News:** página editorial própria, interesses editáveis, ranking simples por palavras-chave e holdings, fontes atribuídas e mensagem de falha honesta; possível consumo de feeds públicos no servidor local. Sem IA generativa no beta.
8. **Entrega:** visualizador único HTML offline e ZIP do projeto organizado, sem necessidade de Codex, configuração de GitHub ou instalação de pacotes npm para abrir a demonstração.

## Testes realizados
- `node --check` para os módulos centrais e servidor de desenvolvimento.
- `node --test`: oito testes automatizados de modelos financeiros, carteira e interpretação limitada de feeds oficiais.
- Compilação estática em `dist` sem erros.
- Testes exploratórios com Chromium e execução dos controles de formulário/cadastro/exportação; resoluções 320, 375, 390, 768, 1024, 1440 e 2560 px.
- Verificações de formato: planilhas XLSX abertas por `openpyxl` e slides PPTX abertos pela biblioteca de PowerPoint.
- Consulta externa de notícias e câmbio **não foi garantida** em todos os ambientes, depende de internet e disponibilidade.

## Feedback de usuários de outras ferramentas
Foram consultados relatos públicos em fóruns como Reddit e materiais de produtos financeiros, destacando temas recorrentes: reconciliação/sincronização confusa, filtros de relatórios inconsistentes, investimentos misturados ao orçamento, limitação de exportações e pouco valor real em dashboards extensos. Relatos individuais não são estatísticas representativas. O KERDEX propõe origem/datas transparentes e separação de conceitos, mas ainda não soluciona todos esses problemas na prática.

## Mudanças futuras de arquitetura
Migrar a base JavaScript legada para arquitetura com tipagem completa, testes unitários/E2E mais amplos, componentes reaproveitáveis, design tokens de tema e i18n centralizados, conforme roadmap. Uma migração bem testada deve preceder lançamento comercial.

## Referências de observação do mercado e normas
- [Organizze](https://www.organizze.com.br/) e [YNAB](https://www.ynab.com/) — organização financeira, clareza do fluxo de orçamento.
- [Monarch Money](https://www.monarchmoney.com/) e [Status Invest](https://statusinvest.com.br/) — visão de patrimônio e investimentos; são referências conceituais, não modelos para cópia.
- [TradingView](https://www.tradingview.com/) — padrões de exploração gráfica para módulos futuros.
- [Comunidade de relatos — r/MonarchMoney](https://www.reddit.com/r/MonarchMoney/) — críticas e experiências individuais (não representam pesquisa estatística).
- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) e [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) — metas de acessibilidade e requisitos de segurança antes de produção.
- [ECB RSS](https://www.ecb.europa.eu/rss/press.html), [Federal Reserve](https://www.federalreserve.gov/newsevents/pressreleases.htm), [GDELT DOC](https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/) e [Frankfurter API](https://frankfurter.dev/) — fontes externas **condicionadas à conectividade e respectivos termos de uso**.

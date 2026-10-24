# PROMPT MESTRE — KERDEX
## Direção de Arte, Branding, UX/UI e Design System — Primeiro Protótipo Web

**Versão:** 1.0  
**Idioma:** Português brasileiro  
**Natureza:** Briefing estratégico e visual para desenvolvimento  
**Projeto:** KERDEX — Plataforma de inteligência financeira e organização pessoal

---

# 1. CONTEXTO DO PROJETO

Estamos desenvolvendo a **KERDEX**, uma futura plataforma digital que pretende reunir ferramentas de gestão financeira, planejamento de compras, investimentos, educação, organização pessoal e inteligência artificial.

O nome KERDEX foi concebido a partir de *kérdos* (κέρδος), palavra do grego antigo associada a ganho, lucro ou vantagem, combinada ao sufixo "-ex", escolhido por sua sonoridade tecnológica.

O significado que queremos construir como marca está relacionado a inteligência, evolução, planejamento, eficiência e decisões financeiras responsáveis.

**Slogan de trabalho: "Inteligência para evoluir."**

A filosofia central do projeto é:

**A plataforma deve se adaptar ao usuário, e não obrigar o usuário a se adaptar à plataforma.**

O público inclui pessoas iniciantes que desejam organizar suas finanças e usuários avançados interessados em investimentos, análises e ferramentas profissionais.

A experiência inicial deve priorizar iniciantes, mantendo capacidade de evolução para usuários experientes.

O desenvolvimento técnico e a definição das funcionalidades permanecem sob responsabilidade deste chat de programação. Este briefing determina a direção estética, visual e de experiência.

Não modificar o escopo funcional já aprovado somente por causa de sugestões visuais. Havendo divergência entre este briefing e uma decisão técnica anterior, apontar o conflito antes de substituir o comportamento existente.

---

# 2. OBJETIVO DO DESIGN

Criar uma plataforma que transmita, nos primeiros instantes de contato:

1. **Confiança:** aparência consistente, linguagem transparente e navegação previsível.
2. **Tecnologia:** produto moderno, inteligente e preparado para expansão.
3. **Sofisticação:** estética premium, minimalista e profissional.
4. **Clareza:** informações financeiras compreensíveis sem exigir conhecimento especializado.
5. **Controle:** o usuário deve entender suas informações e suas escolhas.
6. **Personalização:** interface capaz de evoluir conforme suas necessidades.
7. **Eficiência:** facilitar a realização das principais tarefas sem distrações.
8. **Acessibilidade:** experiência inclusiva e funcional em diferentes dispositivos.

A estética desejada combina a credibilidade de uma fintech consolidada, a clareza de um produto de gestão financeira e a sofisticação de uma plataforma tecnológica moderna.

**Evitar aparência de template genérico, cassino, corretora especulativa, criptomoeda promocional ou painel administrativo empresarial antigo.**

A interface não deve impressionar apenas por elementos decorativos. Deve transmitir profissionalismo pela qualidade da experiência.

---

# 3. IDENTIDADE VISUAL E PALETA DE CORES

Adotar inicialmente uma identidade baseada em **verde profundo, verde-lima, branco suave e neutros sofisticados**.

A combinação deverá ser utilizada de maneira controlada, com predominância de superfícies neutras e destaques pontuais.

## 3.1 Cores principais

| Papel | Cor | HEX |
|---|---|---|
| Verde institucional | Verde profundo | `#102B22` |
| Verde secundário | Verde floresta | `#183F31` |
| Destaque da marca | Lima tecnológico | `#C8F35A` |
| Destaque alternativo | Lima escurecido | `#B4E24D` |
| Fundo claro | Branco esverdeado | `#F7F9F6` |
| Superfície principal | Branco | `#FFFFFF` |
| Superfície secundária | Cinza-esverdeado | `#EEF3ED` |
| Texto principal | Grafite esverdeado | `#17251E` |
| Texto secundário | Cinza-verde | `#52645A` |
| Bordas | Verde-acinzentado claro | `#DCE6DE` |

## 3.2 Cores semânticas

| Estado | HEX |
|---|---|
| Sucesso / positivo | `#1F7652` |
| Atenção | `#9A6B09` |
| Erro / negativo | `#B42318` |
| Informação | `#246B84` |

Estas são cores de referência para o design system, não permissões para aplicá-las indiscriminadamente. Os estados semânticos devem ter versões adequadas para texto, fundo, borda e ícones, com contraste verificado.

## 3.3 Regras de utilização

- Utilizar verde profundo em elementos institucionais, navegação, títulos específicos e ações primárias.
- Reservar verde-lima para destaques importantes, indicadores selecionados e detalhes da marca.
- Não usar verde-lima como texto pequeno sobre fundo branco.
- Utilizar branco suave como base de páginas e painéis.
- Usar superfícies brancas para separar agrupamentos de informações.
- Evitar gradientes intensos, neon excessivo e brilho artificial.
- Nunca usar somente cores para indicar lucro, prejuízo, erro ou sucesso.
- Valores financeiros positivos e negativos devem ter sinais, rótulos e explicações, além da cor.

**O verde-lima é uma cor de destaque, não a cor predominante de todas as telas.**

A hierarquia visual deve ser construída principalmente por tipografia, espaçamento, agrupamento, contraste e prioridade da informação.

---

# 4. TEMA CLARO E ESCURO

## 4.1 Tema claro

Recomendado como padrão inicial para páginas de trabalho, dashboards, tabelas, formulários e relatórios.

Características:

- Fundo branco suave.
- Cards brancos.
- Textos em grafite escuro.
- Navegação em verde profundo ou superfície neutra.
- Bordas discretas.
- Gráficos com contraste suficiente.
- Destaques em verde-lima apenas quando necessários.

## 4.2 Tema escuro

Planejar uma variante escura coerente com a identidade.

Referências:

- Fundo principal: `#0B1D16`
- Superfícies: `#123327`
- Texto principal: `#F3F7F3`
- Texto secundário: `#BDCDC1`
- Destaque: `#C8F35A`

Não basta inverter cores. Gráficos, estados, formulários e superfícies precisam de combinações próprias.

**Não implementar um seletor de temas meramente decorativo.** Se o tema escuro ainda não estiver funcional, manter apenas o tema claro no primeiro protótipo e deixar a alternativa documentada para desenvolvimento posterior.

---

# 5. TIPOGRAFIA

A tipografia deverá transmitir modernidade, legibilidade e estabilidade.

## Fontes recomendadas

**Manrope:** títulos, chamadas e destaques institucionais.

**Inter:** textos, números, formulários, navegação e tabelas.

Se duas famílias tipográficas comprometerem o desempenho, utilizar Inter como família principal em toda a aplicação.

Evitar fontes exageradamente futuristas, estreitas, decorativas ou de leitura difícil.

## Hierarquia sugerida

- H1: 40–64 px em desktop, com adaptação para celular.
- H2: 32–44 px.
- H3: 24–30 px.
- H4: 20–24 px.
- Corpo: 16–18 px.
- Legendas e informações auxiliares: preferencialmente 13–14 px ou mais, conforme contexto.
- Botões: 14–16 px, com peso intermediário.

Utilizar pesos 400, 500, 600 e 700 conforme necessidade.

Priorizar boa altura de linha, espaçamento e alinhamento.

**Valores monetários e dados de tabela devem utilizar numerais tabulares quando possível**, evitando deslocamentos visuais durante atualizações.

Em textos longos, limitar a largura das linhas para favorecer leitura confortável.

---

# 6. GRID, ESPAÇAMENTO E COMPOSIÇÃO

Utilizar um sistema de espaçamento coerente baseado em múltiplos de 4 e 8 px.

Escala sugerida:

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px`

Recomendações:

- Largura máxima do conteúdo principal do site institucional: aproximadamente 1.200–1.280 px.
- Utilizar grid de 12 colunas em desktop quando apropriado.
- Em celular, utilizar composição fluida com margens laterais adequadas.
- Evitar excesso de informações acima da primeira dobra.
- Criar separação visual clara entre seções.
- Usar espaçamento generoso entre grupos diferentes e espaçamento menor entre elementos relacionados.
- Preferir alinhamento consistente, evitando cards com tamanhos arbitrários.

## Cards e superfícies

- Bordas arredondadas normalmente entre 12 e 16 px.
- Bordas suaves e discretas.
- Sombras leves, utilizadas somente quando ajudam a estabelecer hierarquia.
- Padding interno geralmente entre 16 e 24 px.
- Estados de hover e foco claramente identificáveis.
- Evitar excesso de cards pequenos e repetitivos.

**Um dashboard não deve parecer um mosaico de caixas sem prioridade.**

---

# 7. LOGOTIPO E ELEMENTOS DA MARCA

O logotipo definitivo da KERDEX ainda não está aprovado.

Para o primeiro protótipo, utilizar um **wordmark tipográfico provisório KERDEX**, sem inventar um símbolo permanente.

Diretrizes:

- Grafia principal em letras maiúsculas: KERDEX.
- Tipografia geométrica, contemporânea e elegante.
- Legibilidade em tamanhos reduzidos.
- Não exagerar no destaque da letra X.
- Evitar referências literais a foguetes, moedas, cifrões, gráficos ascendentes ou órbitas.
- Evitar imitar marcas financeiras existentes.
- Preparar espaço para futura aplicação de símbolo e favicon próprios.

A identidade deve continuar reconhecível mesmo quando o logotipo estiver em preto e branco.

O slogan não precisa acompanhar o logotipo em todas as telas.

---

# 8. REFERÊNCIAS E DIFERENCIAÇÃO

Utilizar como referências conceituais, sem copiar layouts, logotipos ou identidade visual:

**Nubank:** coerência de marca e simplicidade.

**Mobills e Organizze:** organização financeira e facilidade de compreensão.

**YNAB:** planejamento orientado a metas.

**Monarch Money:** painéis personalizáveis e visão consolidada.

**Kinvo:** personalização da visualização de investimentos.

**TradingView:** análises avançadas e exploração de dados, somente quando adequadas ao contexto.

## Diferencial desejado da KERDEX

Não queremos apenas replicar aplicativos financeiros tradicionais.

Queremos transmitir a sensação de um **ambiente financeiro pessoal inteligente**, no qual informações, objetivos, compras e ferramentas trabalham em conjunto.

A experiência deverá ser:

- Simples na entrada.
- Completa quando necessário.
- Personalizável de forma gradual.
- Profissional sem ser intimidadora.
- Financeiramente responsável.
- Coerente entre todos os módulos.

---

# 9. PRINCÍPIOS DE PSICOLOGIA APLICADA AO DESIGN

Usar pesquisas de psicologia cognitiva, comportamento e experiência do usuário como fundamento para escolhas visuais e interativas.

**Não aplicar técnicas psicológicas com o objetivo de explorar vieses ou induzir decisões financeiras prejudiciais.**

## 9.1 Carga cognitiva e simplicidade

Base conceitual: Nielsen Norman Group e princípios de cognição aplicados à interação.

- Destacar primeiro as informações mais importantes.
- Evitar apresentar dezenas de recursos simultaneamente.
- Agrupar funcionalidades por objetivos compreensíveis.
- Revelar opções avançadas progressivamente.
- Utilizar linguagem familiar ao usuário.
- Evitar exigir memorização de procedimentos.

Aplicação: na tela inicial, o usuário deve entender sua situação financeira antes de encontrar ferramentas analíticas complexas.

## 9.2 Clareza e feedback

Base conceitual: Don Norman, *The Design of Everyday Things*.

- Botões precisam parecer acionáveis.
- Ações precisam ter resultados visíveis.
- Processos devem informar seus estados.
- Informações importantes não devem depender de ícones ambíguos.
- Ações destrutivas precisam ser identificáveis e exigir confirmação proporcional ao risco.

Aplicação: após salvar uma meta, apresentar confirmação real. Quando houver falha, explicar o problema e oferecer recuperação.

## 9.3 Decisões financeiras refletidas

Base conceitual: Daniel Kahneman, *Rápido e Devagar*.

- Não explorar medo de perder dinheiro.
- Não criar falsas urgências.
- Apresentar riscos, custos e limitações.
- Facilitar comparações lado a lado.
- Ajudar o usuário a avaliar consequências antes de tomar decisões.

Aplicação: ao planejar uma compra, mostrar custo total, parcelas e impacto no orçamento quando esses cálculos estiverem disponíveis.

## 9.4 Arquitetura de escolhas

Base conceitual: Richard Thaler e Cass Sunstein, *Nudge*.

- Organizar opções de maneira clara.
- Utilizar padrões que beneficiem o usuário.
- Preservar liberdade de escolha.
- Permitir revisar e alterar decisões.
- Evitar selecionar automaticamente serviços pagos ou autorizações sensíveis.

Aplicação: oferecer caminhos simples para organizar despesas ou estabelecer metas, sem impedir alternativas.

## 9.5 Confiança e credibilidade

Base conceitual: Robert Cialdini, *Influence*.

- Utilizar credenciais somente quando comprovadas.
- Exibir avaliações reais, se existirem e forem autorizadas.
- Demonstrar conhecimento por meio de conteúdos úteis.
- Explicar limites dos serviços.
- Informar claramente preços, parcerias e eventuais comissões.

Não utilizar depoimentos fictícios, números de usuários inventados ou selos de segurança sem comprovação.

## 9.6 Hábitos positivos e engajamento

Base conceitual: BJ Fogg, *Behavior Model*.

- Propor pequenas ações compreensíveis.
- Diminuir a complexidade das tarefas iniciais.
- Oferecer lembretes configuráveis.
- Mostrar progresso significativo.
- Reforçar o aprendizado e as decisões conscientes.

Exemplos: completar a configuração de uma meta ou acompanhar o orçamento mensal.

Evitar gamificação associada a frequência compulsiva de operações financeiras, competição por rentabilidade ou pressão para acessar o aplicativo diariamente.

---

# 10. SITE INSTITUCIONAL — ESTRUTURA DA HOME

A página inicial pública deverá ser uma apresentação clara, premium e responsiva.

A estrutura proposta é a seguinte.

## 10.1 Header

Elementos sugeridos:

- Wordmark KERDEX.
- Produto.
- Como funciona.
- Recursos.
- Conteúdos ou Educação, quando existirem.
- Entrar, caso o acesso esteja disponível.
- Ação principal correspondente ao estágio real do produto.

Utilizar navegação limpa e responsiva, com menu móvel acessível.

Não apresentar uma navegação com muitos itens sem conteúdo.

## 10.2 Hero principal

A primeira área deverá comunicar rapidamente a proposta de valor.

**Título sugerido:**

"Mais clareza para seu dinheiro. Mais inteligência para suas decisões."

**Subtítulo sugerido:**

"Conheça a KERDEX, uma plataforma em desenvolvimento para ajudar você a organizar finanças, planejar compras e acompanhar seus objetivos em um só lugar."

A redação deverá evoluir conforme as funcionalidades ficarem realmente disponíveis.

### CTA principal

Se houver lista de espera funcional: "Acompanhar o lançamento" ou "Entrar na lista de interesse".

Se houver um protótipo navegável: "Explorar demonstração".

Se o produto já estiver operacional: "Começar gratuitamente", somente se for realmente gratuito.

Nunca exibir botões que levam a funcionalidades inexistentes sem informar isso.

### Visual do hero

Preferir uma composição elegante com:

- Fundo predominantemente verde profundo.
- Título branco.
- Pequenos destaques em verde-lima.
- Demonstração visual do produto, quando houver protótipo confiável.
- Poucas animações.
- Espaçamento generoso.

Evitar personagens genéricos, moedas voando, cifras e montagens artificiais de pessoas enriquecendo.

## 10.3 Apresentação da proposta

Explicar os principais problemas que a plataforma pretende resolver:

- Falta de clareza sobre receitas e despesas.
- Dificuldade em planejar compras importantes.
- Objetivos financeiros sem acompanhamento.
- Informações distribuídas em várias ferramentas.

Conectar cada problema a uma proposta concreta, diferenciando o que já existe do que está planejado.

## 10.4 Recursos em destaque

Priorizar visualmente:

1. Organização financeira.
2. Planejamento de compras.
3. Metas e objetivos.
4. Simuladores e análises, conforme escopo aprovado.

Outros módulos poderão aparecer em uma área de visão futura, claramente identificados como planejados.

## 10.5 Como funciona

Utilizar uma explicação simples em três etapas, ajustada às funcionalidades implementadas:

1. Defina seus objetivos.
2. Organize suas informações.
3. Acompanhe seu planejamento.

Não prometer automações, sincronização bancária ou recomendações de IA antes de sua implementação.

## 10.6 Demonstração do produto

Apresentar imagens ou componentes do dashboard.

Requisitos:

- Dados simulados claramente rotulados como "Demonstração".
- Interface visualmente consistente.
- Números plausíveis, mas nunca apresentados como dados reais de clientes.
- Sem telas de bancos simulando integrações inexistentes.
- Capturas atualizadas conforme o software evoluir.

## 10.7 Confiança e transparência

Preparar seção com informações verdadeiras sobre a plataforma.

Possíveis temas:

- Como o produto funciona.
- Como os dados são utilizados.
- Quem é responsável pelo serviço, quando essas informações estiverem formalizadas.
- Política de privacidade real.
- Limitações das ferramentas.
- Diferenciação entre educação financeira e serviços regulados.

Não adicionar logotipos de bancos, órgãos reguladores, certificados ou parceiros sem autorização e comprovação.

## 10.8 Roadmap público

Se fizer sentido para o estágio do produto, apresentar categorias de evolução:

- Disponível.
- Em desenvolvimento.
- Planejado.

Os estados precisam corresponder ao andamento real do projeto.

Não divulgar prazos fictícios ou apresentar protótipos como funcionalidades prontas.

## 10.9 Perguntas frequentes

Responder dúvidas sobre:

- O que é a KERDEX.
- Para quem está sendo desenvolvida.
- Quais funcionalidades estão disponíveis.
- Como funcionará o acesso antecipado.
- Como acompanhar novidades.
- Como são tratados os dados pessoais, quando aplicável.

## 10.10 Rodapé

Prever:

- Identidade KERDEX.
- Navegação institucional.
- Contato real, quando disponível.
- Informações sobre o projeto.
- Documentos legais aplicáveis.
- Redes sociais oficiais, somente quando criadas.
- Direitos autorais e demais informações institucionais necessárias.

---

# 11. PLATAFORMA WEB — DIREÇÃO DO DASHBOARD

Se o protótipo incluir a área autenticada do aplicativo, usar a mesma identidade da landing page, mas priorizar produtividade e compreensão dos dados.

A plataforma deverá parecer um ambiente de trabalho financeiro pessoal, sem excesso de decoração.

## 11.1 Navegação

No desktop, considerar:

- Barra lateral recolhível.
- Área principal expansível.
- Identificação clara da seção ativa.
- Acesso a configurações e ajuda.
- Navegação por ícones acompanhados de texto.

No celular, adaptar a navegação para evitar menus extensos e tabelas cortadas.

Os módulos deverão aparecer conforme disponibilidade real e escopo aprovado.

Sugestão de organização inicial:

- Visão geral.
- Finanças.
- Compras.
- Metas.
- Simuladores.
- Configurações.

Investimentos, Trade, Academy, Notícias e recursos avançados podem ser apresentados futuramente, conforme implementação.

## 11.2 Visão geral

O usuário deverá encontrar rapidamente respostas para perguntas como:

- Como está meu orçamento?
- Quanto entrou e saiu neste período?
- Quais são meus próximos compromissos?
- Como estão minhas metas?
- O que merece minha atenção?

Elementos possíveis, conforme dados e funções disponíveis:

- Resumo de receitas e despesas.
- Saldo ou resultado do período com definição clara.
- Gráfico de movimentações.
- Metas em andamento.
- Próximos vencimentos.
- Atividade recente.
- Ações rápidas relevantes.

Não exigir que todos esses elementos estejam no primeiro protótipo.

Priorizar uma estrutura visual preparada para crescer sem precisar ser completamente redesenhada.

## 11.3 Hierarquia do painel

A ordem recomendada é:

**Primeiro:** situação geral e informações essenciais.

**Depois:** evolução, comparações e tendências.

**Por último:** detalhes, filtros avançados e análises específicas.

Os indicadores financeiros precisam de rótulos claros, períodos definidos e explicações quando necessário.

Não misturar saldo em conta, patrimônio, lucro, receita e orçamento como se representassem o mesmo conceito.

---

# 12. DESIGN PARA OS MÓDULOS DA KERDEX

## 12.1 Finanças pessoais

Estilo: limpo, objetivo e organizado.

Priorizar:

- Valores legíveis.
- Categorias com ícones e nomes claros.
- Separação de receitas e despesas.
- Filtros compreensíveis.
- Informações de período.
- Tabelas de movimentações.
- Ações de inclusão e edição identificáveis.

Não sobrecarregar a tela com indicadores que não ajudam na tomada de decisões.

## 12.2 Planejamento de compras

Este será um dos diferenciais visuais mais importantes da KERDEX.

O design deverá permitir, futuramente, apresentar:

- Produto desejado.
- Valor estimado ou observado.
- Meta de economia.
- Prazo de planejamento.
- Progresso.
- Histórico de preços, quando existente.
- Comparação entre opções.
- Impacto financeiro da compra.
- Recomendações explicadas, quando implementadas.

A experiência deverá transmitir planejamento e consciência financeira, não incentivar compras por impulso.

Se houver indicação de produtos por afiliados, a identificação comercial deverá ser clara.

## 12.3 Metas financeiras

Utilizar:

- Barras de progresso.
- Marcos importantes.
- Valor planejado e acumulado.
- Prazos.
- Histórico de evolução.
- Feedback positivo moderado.

Evitar mensagens que culpabilizem usuários com dificuldades financeiras.

## 12.4 Investimentos — futuro

Preparar uma linguagem visual compatível com:

- Carteiras.
- Alocação de ativos.
- Rentabilidade.
- Comparações.
- Indicadores.
- Riscos.
- Histórico e fontes dos dados.

Não utilizar gráficos fictícios com aparência de resultado garantido.

## 12.5 Trading — futuro

Pode exigir maior densidade informacional, tabelas e gráficos complexos.

Esses padrões deverão existir apenas dentro do módulo avançado.

Não transformar a experiência geral da KERDEX em uma interface de day trade.

## 12.6 Educação — futuro

Priorizar:

- Trilhas educativas.
- Continuidade das aulas.
- Conteúdo bem organizado.
- Exercícios e resumos.
- Progresso real de aprendizagem.
- Acessibilidade de vídeos e textos.

## 12.7 Inteligência artificial — futuro

A interface deverá distinguir claramente:

- Dados verificados.
- Cálculos.
- Simulações.
- Estimativas.
- Explicações geradas por IA.
- Informações desconhecidas.

O usuário deve compreender o que a IA utilizou para produzir uma resposta, quando isso for tecnicamente possível.

Evitar apresentar projeções incertas como fatos.

---

# 13. GRÁFICOS E VISUALIZAÇÃO DE DADOS

Os gráficos deverão priorizar precisão, contexto e facilidade de interpretação.

Diretrizes:

- Usar gráficos de barras para comparações entre categorias.
- Usar linhas para acompanhar tendências ao longo do tempo.
- Utilizar barras de progresso para metas.
- Usar gráficos de composição somente quando facilitarem a leitura.
- Evitar gráficos 3D.
- Evitar animações que distorçam a percepção dos números.
- Apresentar unidades, datas e períodos.
- Permitir consultar valores exatos quando houver interação.
- Identificar fontes e atualização de dados externos.
- Não manipular escalas para sugerir crescimento artificial.
- Considerar baseline zero em gráficos de barras quantitativas.
- Não usar cor como único meio de diferenciação entre séries.

As tabelas devem ser uma alternativa acessível quando necessárias.

Em dispositivos pequenos, priorizar a informação essencial e permitir o acesso aos detalhes sem comprometer a legibilidade.

---

# 14. COMPONENTES DO DESIGN SYSTEM

Definir padrões reutilizáveis para:

- Botões primários, secundários e terciários.
- Campos de texto.
- Seletores.
- Checkboxes.
- Radio buttons.
- Cards.
- Tabelas.
- Tabs.
- Modais.
- Menus suspensos.
- Tooltips.
- Alertas.
- Indicadores de progresso.
- Barras de pesquisa.
- Filtros.
- Gráficos.
- Navegação.
- Componentes de estado vazio.
- Mensagens de erro.
- Skeletons ou estados de carregamento.

Cada componente deverá possuir estados coerentes:

**Padrão, hover, foco, pressionado, selecionado, desabilitado, carregamento, sucesso e erro**, conforme a natureza do componente.

A aparência deve ser consistente em todas as telas.

Não criar componentes visualmente diferentes para funções equivalentes sem justificativa.

---

# 15. MICROINTERAÇÕES E ANIMAÇÕES

As animações deverão acrescentar entendimento, não apenas aparência.

Diretrizes:

- Transições discretas.
- Feedback imediato.
- Hover suave.
- Indicadores claros de carregamento.
- Abertura de menus sem movimentos exagerados.
- Mudanças de dados sem distrações.
- Movimento consistente entre elementos similares.
- Respeitar preferências de redução de movimento.

Tempos ilustrativos para testes:

- Feedback simples: aproximadamente 120–180 ms.
- Transições de interface: aproximadamente 180–280 ms.

Esses valores não são requisitos rígidos. Devem ser ajustados conforme o componente e testados com usuários.

Evitar animações constantes no dashboard, fundos em movimento e efeitos decorativos pesados.

---

# 16. ONBOARDING E PRIMEIRA EXPERIÊNCIA

Se houver área de cadastro e configuração inicial, a experiência deverá ser acolhedora, objetiva e configurável.

Objetivos:

- Demonstrar valor com poucas ações.
- Evitar perguntas excessivas.
- Coletar somente informações necessárias.
- Permitir pular etapas opcionais.
- Informar a finalidade de cada solicitação.
- Oferecer exemplos, quando úteis.
- Não exigir conexão bancária para demonstrar funcionalidades que poderiam funcionar manualmente.

O usuário poderá escolher seu principal objetivo entre opções como:

- Organizar meu orçamento.
- Planejar uma compra.
- Economizar para uma meta.
- Conhecer minhas finanças.

Essa personalização só deverá ser apresentada como funcional se houver comportamento correspondente no protótipo.

Nunca criar uma tela que solicite credenciais bancárias para simular uma integração.

---

# 17. PERSONALIZAÇÃO

A personalização é um dos valores centrais da KERDEX.

O design deverá estar preparado para, futuramente, permitir:

- Escolha entre temas.
- Ajuste de visualizações.
- Preferência de indicadores.
- Exibição ou ocultação de widgets.
- Ordem de componentes.
- Configuração de alertas.
- Preferências de notificações.
- Ajustes de acessibilidade.
- Experiência básica ou avançada.

Não é necessário implementar todos esses recursos no primeiro protótipo.

A interface não pode ficar excessivamente complexa apenas para parecer personalizável.

---

# 18. ACESSIBILIDADE

Adotar **WCAG 2.2 nível AA como objetivo de qualidade**.

Requisitos de design:

- Contraste mínimo de 4,5:1 para textos comuns, salvo exceções normativas.
- Contraste mínimo de 3:1 para textos grandes, conforme a norma.
- Componentes não textuais com contraste adequado.
- Botões e controles suficientemente grandes para interação por toque.
- Navegação por teclado.
- Indicadores de foco visíveis.
- Labels persistentes nos formulários.
- Mensagens de erro descritivas.
- Estrutura semântica coerente.
- Compatibilidade com leitores de tela.
- Não depender apenas de cores.
- Respeitar preferências de redução de movimento.
- Permitir ampliação de texto sem perda das funções.

Preferir controles de toque com cerca de 44–48 px de altura quando apropriado, sem confundir essa recomendação com os mínimos normativos específicos.

Não sacrificar acessibilidade para preservar uma estética minimalista.

---

# 19. RESPONSIVIDADE

Desenvolver uma experiência adequada a:

- Celulares pequenos.
- Celulares maiores.
- Tablets.
- Notebooks.
- Monitores desktop.

O projeto deve funcionar em larguras intermediárias, sem depender apenas de três resoluções fixas.

No mobile:

- Priorizar as principais ações.
- Reorganizar cards verticalmente.
- Evitar textos longos demais no hero.
- Reduzir elementos decorativos.
- Reestruturar gráficos complexos.
- Facilitar interação com uma mão quando possível.
- Evitar menus que ocupem espaço desnecessário.
- Preservar legibilidade dos valores financeiros.

A experiência mobile não deve ser simplesmente a versão desktop comprimida.

---

# 20. FORMULÁRIOS E MENSAGENS

Os formulários devem utilizar:

- Labels claros.
- Campos obrigatórios identificados.
- Ajuda contextual.
- Validação compreensível.
- Mensagens próximas ao campo relevante.
- Preservação de dados preenchidos após erros, quando seguro e possível.
- Confirmação de ações reais.

Exemplo de linguagem inadequada:

"Erro 422: inválido."

Exemplo de linguagem desejada:

"Verifique o valor informado e tente novamente."

Nunca mostrar confirmação de salvamento quando os dados não tiverem sido efetivamente persistidos.

## Estados vazios

Exemplo:

"Você ainda não adicionou nenhuma despesa. Comece registrando sua primeira movimentação."

O texto deverá estar acompanhado de uma ação útil, caso essa ação já exista.

## Erros de conexão

Explicar quando os dados não puderem ser carregados e permitir nova tentativa quando houver suporte técnico.

---

# 21. TOM DE VOZ E MICROCOPY

A KERDEX deve falar de maneira:

- Profissional.
- Clara.
- Objetiva.
- Acessível.
- Respeitosa.
- Confiante sem exageros.

Evitar linguagem excessivamente bancária, técnica ou promocional.

Não utilizar expressões como:

- "Fique rico agora."
- "Lucro garantido."
- "Nunca mais perca dinheiro."
- "A IA sabe o melhor investimento."
- "Oferta imperdível, decida imediatamente."

Preferir:

- "Entenda suas opções."
- "Planeje com mais clareza."
- "Acompanhe seu progresso."
- "Compare cenários."
- "Decida com mais informação."

Explicar termos técnicos quando necessário.

Evitar o excesso de emojis em áreas de trabalho e conteúdo financeiro.

---

# 22. CREDIBILIDADE, PRIVACIDADE E SEGURANÇA PERCEBIDA

A confiança deve ser consequência de práticas reais, não apenas de elementos gráficos.

Prever espaço e linguagem adequada para:

- Política de privacidade.
- Termos aplicáveis.
- Informações sobre tratamento de dados.
- Explicações de funcionalidades.
- Status de conexão de contas, quando aplicável.
- Informação sobre origem dos dados.
- Indicação de dados simulados.
- Informações sobre serviços regulados, quando pertinentes.

Não adicionar alegações de criptografia específica, certificação, regulação ou parceria sem confirmação técnica e documental.

As decisões de design deverão respeitar os princípios da LGPD e evitar padrões manipulativos.

Sempre distinguir:

**Demonstração**, **Em desenvolvimento**, **Disponível** e **Funcionalidade planejada**.

Em futuras funcionalidades de análise, consultoria ou recomendação de investimentos, submeter o escopo à avaliação regulatória apropriada. Um aviso genérico de "não é recomendação" não substitui obrigações legais aplicáveis.

---

# 23. DESEMPENHO E QUALIDADE PERCEBIDA

O design deverá ser preparado para uma aplicação leve e rápida.

Recomendações:

- Evitar vídeos de fundo desnecessários.
- Reduzir imagens pesadas.
- Evitar animações complexas sem valor funcional.
- Priorizar carregamento dos elementos mais importantes.
- Reduzir fontes e recursos visuais redundantes.
- Evitar mudanças bruscas de layout enquanto a página carrega.
- Garantir respostas visuais adequadas a interações.

Utilizar Core Web Vitals como referência de qualidade, com validação técnica pelo chat de desenvolvimento.

Metas orientativas para páginas reais:

- LCP: até 2,5 s.
- INP: até 200 ms.
- CLS: até 0,1.

Essas metas deverão ser medidas, não simplesmente declaradas como alcançadas.

---

# 24. SEO E CONTEÚDO INSTITUCIONAL

Preparar a página pública para comunicar claramente:

- Nome da plataforma.
- Proposta de valor.
- Problemas que pretende resolver.
- Funcionalidades reais.
- Conteúdos educativos.
- Informações institucionais.

Considerar:

- Títulos descritivos.
- Estrutura de headings.
- Textos claros.
- Descrições de imagens.
- Organização semântica.
- Conteúdo relevante para usuários brasileiros.
- Compartilhamento em redes sociais.

A estratégia de SEO e os conteúdos futuros serão definidos separadamente no chat de branding e marketing.

Evitar criar dezenas de páginas de conteúdo vazio apenas para atrair visitantes.

---

# 25. ENGAJAMENTO E RETENÇÃO RESPONSÁVEIS

A interface pode incentivar o retorno à plataforma por meio de utilidade real.

Exemplos adequados:

- Relatórios periódicos.
- Evolução de metas.
- Lembretes configurados pelo usuário.
- Planejamento de compras.
- Indicadores de progresso.
- Comparações financeiras compreensíveis.
- Recomendações educativas contextualizadas.

Evitar:

- Gamificação de operações especulativas.
- Rankings de quem lucrou mais.
- Notificações frequentes sem necessidade.
- Sensação artificial de urgência.
- Penalidades emocionais por dias sem acesso.
- Disfarçar conteúdos patrocinados.
- Incentivar gastos apenas para aumentar engajamento.

A métrica principal do design deve ser a capacidade de o usuário realizar suas tarefas e tomar decisões melhores, não apenas o tempo de permanência.

---

# 26. PADRÕES BRASILEIROS

Adotar português do Brasil como idioma inicial.

Utilizar:

- Moeda: `R$ 1.234,56`.
- Datas: `23/10/2026`, quando apropriado.
- Percentuais e valores seguindo convenções brasileiras.
- Vocabulário financeiro compreensível para brasileiros.
- Formatos de entrada adequados a valores monetários.
- Linguagem de investimentos e compras coerente com o mercado nacional.

Garantir que números, separadores decimais e arredondamentos sejam apresentados corretamente.

Evitar traduções automáticas de termos de interfaces estrangeiras que resultem em expressões pouco naturais.

---

# 27. PRIORIDADES PARA O PRIMEIRO PROTÓTIPO

Não é necessário implementar tudo o que está neste documento imediatamente.

## Prioridade P0 — Essencial

- Identidade visual KERDEX.
- Paleta e tipografia.
- Layout responsivo.
- Header e navegação coerentes.
- Home institucional, se fizer parte do escopo.
- Componentes básicos padronizados.
- Estados de interação.
- Acessibilidade básica.
- Textos realistas e transparentes.
- Aparência coerente entre as telas efetivamente desenvolvidas.

## Prioridade P1 — Se a área interna fizer parte do protótipo

- Estrutura do dashboard.
- Navegação interna.
- Cards financeiros.
- Gráficos e tabelas.
- Estados vazios.
- Fluxos de metas e compras aprovados para o protótipo.
- Experiência adaptada ao mobile.
- Demonstrações rotuladas quando houver dados simulados.

## Prioridade P2 — Evolução futura

- Tema escuro completo.
- Personalização avançada.
- Bibliotecas de dashboards.
- Identidade audiovisual integrada.
- Módulos especializados de investimentos e trading.
- Recursos educacionais avançados.
- Camadas visuais de IA.
- Interações complexas e automações.

**Se o primeiro protótipo for apenas o site institucional, não implementar a plataforma interna inteira por causa deste briefing.**

Nesse caso, desenvolver uma apresentação pública de alta qualidade e, quando útil, uma visualização demonstrativa do produto.

---

# 28. ENTREGÁVEIS ESPERADOS

Ao aplicar este briefing, desejo que sejam produzidos ou definidos, conforme o escopo técnico:

1. Um sistema visual inicial da KERDEX.
2. Uma especificação de cores e tipografia.
3. Padrões de componentes reutilizáveis.
4. A hierarquia visual das páginas previstas.
5. Uma página inicial profissional e responsiva.
6. O padrão visual da área interna, caso esteja no escopo.
7. Versões desktop e mobile.
8. Estados de interação, erro, carregamento e ausência de dados.
9. Diferenciação clara entre conteúdo real e demonstrativo.
10. Uma relação do que foi implementado e do que ficou planejado.

Não inventar dados de usuários, parcerias, certificados ou funcionalidades para preencher espaços visuais.

Quando houver necessidade de escolher entre aparência e usabilidade, priorizar o equilíbrio, com preferência pela clareza e funcionalidade.

---

# 29. REFERÊNCIAS DE PESQUISA PARA CONSULTA

Utilizar estas fontes como referências conceituais e normativas:

**Psicologia, interação e comportamento**

- Don Norman — *The Design of Everyday Things*.
- Daniel Kahneman — *Rápido e Devagar*.
- Richard Thaler e Cass Sunstein — *Nudge*.
- Robert Cialdini — *Influence*.
- BJ Fogg — *Behavior Model*.
- Jakob Nielsen — heurísticas de usabilidade.
- Nielsen Norman Group — divulgação progressiva de funcionalidades.

**Normas e qualidade**

- W3C — WCAG 2.2.
- Google web.dev — Core Web Vitals.
- ANPD — boas práticas de privacidade e cookies.
- CVM — orientações sobre serviços e recomendações de investimento.
- Banco Central do Brasil — orientações sobre Open Finance, quando relevante.

**Mercado**

- Nubank.
- Mobills.
- Organizze.
- YNAB.
- Monarch Money.
- Kinvo.
- TradingView.

Essas referências servem para estudar princípios e padrões. Não copiar elementos proprietários, identidades ou layouts específicos.

---

# 30. INSTRUÇÃO FINAL PARA O DESENVOLVIMENTO

Utilize este documento como a **direção oficial de design inicial da KERDEX**, sem alterar desnecessariamente o escopo de funcionalidades e as decisões técnicas já estabelecidas no projeto.

Quero que o primeiro protótipo transmita a impressão de um produto de tecnologia financeira sério, moderno e preparado para crescer.

Antes de tomar decisões visuais importantes, verifique:

- A solução está de acordo com a identidade da KERDEX?
- O usuário compreenderá a função do elemento?
- A interface é acessível?
- A composição é consistente com as demais páginas?
- Existem elementos decorativos desnecessários?
- Há alguma informação ou promessa que ainda não corresponde à realidade?
- A solução funciona bem em desktop e celular?
- O resultado parece um produto profissional e original, e não um template genérico?

**O objetivo final não é simplesmente criar um site bonito. É estabelecer uma identidade digital coerente, confiável, escalável e centrada no usuário, capaz de acompanhar a evolução da KERDEX durante muitos anos.**

Não trate todas as diretrizes como uma solicitação para implementar todas as funcionalidades. Use-as para orientar o design das páginas e recursos que forem realmente construídos nesta etapa.
# PROMPT MESTRE PARA O CODEX — KERDEX BETA 2.0

**Papel:** aja como uma equipe sênior de engenharia de produto formada por arquiteto de software, engenheiro full-stack, especialista em segurança de aplicações financeiras, engenheiro de dados, profissional de UX/UI, especialista em acessibilidade, QA e product manager. **Sua missão é entregar código funcional, testável, legível e evolutivo, não apenas uma proposta, wireframe ou explicação.**

**Projeto:** KERDEX — plataforma de inteligência financeira, organização pessoal e planejamento de decisões.
**Público inicial:** Brasil; **arquitetura desde o início internacionalizável**.
**Idioma principal:** português brasileiro; experiência em inglês e espanhol também preparada/implementada no escopo indicado.
**Marca de trabalho:** KERDEX, não ORBE nem OBLEX. **Slogan de trabalho:** “Inteligência para evoluir.”
**Objetivo desta entrega:** construir a **KERDEX Beta 2.0** tomando como base o código real do Beta 1.0, os avanços parciais do Beta 2.0, o briefing de design e a imagem original de branding. Não iniciar de uma página vazia sem antes auditar e aproveitar o que for correto.

## 0. INSUMOS, ORDEM DE LEITURA E REGRAS DE FIDELIDADE

No pacote fornecido, consulte nesta ordem:
1. `referencias/KERDEX_Fintech_Brand_Identity_Board.png`: **imagem original enviada pelo fundador**, referência visual prioritária para a identidade da marca, símbolo K, favicon, ícones e banners.
2. `referencias/BRIEFING_DESIGN_KERDEX_V1.md`: diretriz de arte, UX/UI, design system, microcopy, acessibilidade, responsividade e SEO aprovada como apoio.
3. `legado/kerdex-beta-1.0.zip`: **código do protótipo Beta 1.0 efetivamente entregue**, que deve ser extraído e auditado arquivo a arquivo.
4. `legado/kerdex-beta-2.0-parcial.zip`: **trabalho parcialmente iniciado para o Beta 2.0**, com CSS, JS modular, i18n, dados demonstrativos, cálculos em centavos, interfaces e ícones derivados da imagem. Trate como rascunho técnico, não como código de produção validado.
5. `referencias/KERDEX_Beta_2.0_home_desktop.png` e `referencias/KERDEX_Beta_2.0_dashboard_desktop.png`: prévias de interface já produzidas; inspiração adicional de continuidade, não substituem o código nem testes.
6. Este arquivo: instrução de implementação, critérios de qualidade e requisitos de aceite.

Se o usuário anexar a imagem individualmente no Codex, ela é a mesma referência do item 1. **Não reivindicar que o arquivo de imagem esteja embutido em um prompt de texto; deve ser disponibilizado como arquivo/anexo ao ambiente de trabalho.**

**Prioridade para resolver conflitos:** requisitos de segurança, privacidade e veracidade > instrução explícita atual do usuário > imagem de marca recente quanto à identidade visual > briefing de design quanto à UX > comportamento correto existente > sugestões suas. Documente conflitos materiais e a decisão. Nunca comprometa segurança para reproduzir uma tela bonita.

## 1. VISÃO DO PRODUTO E PRINCÍPIOS

KERDEX será um ecossistema modular, progressivo e acessível para: (a) finanças pessoais e orçamento; (b) compras e decisões financeiras; (c) metas; (d) simuladores; (e) investimentos brasileiros e globais; (f) notícias e eventos geopolíticos/econômicos mundiais; (g) análise de ativos e riscos; (h) educação financeira e Academy; (i) trading simulado; (j) organização da vida; (k) personalização profunda; (l) assistente de IA consentido. Já foram levantadas mais de 200 ideias, **mas isso é visão de produto, não autorização para inventar que tudo está pronto na versão 2.0**.

Princípio central: **“A plataforma deve se adaptar ao usuário, e não obrigar o usuário a se adaptar à plataforma.”**

Meta do beta: oferecer valor concreto, com UX premium, custos iniciais reduzidos e fundações arquiteturais sólidas. O usuário deve enxergar claramente a separação entre **DISPONÍVEL**, **DEMONSTRAÇÃO COM DADOS FICTÍCIOS**, **FONTE REAL ATRASADA OU LIMITADA**, **EM DESENVOLVIMENTO** e **PLANEJADO**. Não criar botões mortos, 'saldo bancário' simulado como real, selo de segurança sem auditoria, “IA avaliou” sem motor verdadeiro, notícias inventadas, descontos fabricados, cotações fictícias rotuladas como live ou integrações bancárias falsas.

## 2. PRIMEIRA TAREFA OBRIGATÓRIA: AUDITORIA REAL DO LEGADO

Antes de refatorar, **abra e leia o conteúdo completo** dos arquivos do Beta 1.0 e do Beta 2.0 parcial; faça uma auditoria com severidade, evidências e plano de correção. Não declare que analisou “linha a linha” sem efetivamente fazer a inspeção. O legado Beta 1.0 é composto basicamente por `index.html`, `styles.css`, `app.js`, `README.md`; verifique o ZIP. O Beta 2.0 parcial possui `index.html`, `styles.css`, `src/{app,data,finance,i18n,ui}.js`, `assets/*`, `site.webmanifest` e utilitário de preview. Preserve ativos e comportamentos corretos, reescrevendo o que for necessário.

**Problemas previamente identificados que precisam de confirmação e correção:**
- Beta 1.0: CSS/JS excessivamente minificados ou concentrados, sem componentização, tipagem estática, testes, lint, build e separação de responsabilidades apropriados.
- Beta 1.0: dados demonstrativos somados sem segmentação mensal consistente; receitas, despesas, saldo/resultado e patrimônio confundíveis.
- Beta 1.0: operações limitadas a inclusão/remoção, sem experiência completa de edição/validação e sem estados robustos de cancelamento, erros e vazio.
- Beta 1.0: valores monetários tratados em `number` de ponto flutuante; problemas potenciais de precisão e de localização internacional.
- Beta 1.0: escolha de moeda apenas muda a **formatação/rótulo**, não realiza conversão verdadeira; isso deve ser removido ou explicitado.
- Beta 1.0: amostras restauradas a cada recarga; ausência de persistência, servidor, autenticação, isolamento multiusuário e auditoria — **não apto a armazenar dinheiro ou dados reais**.
- Beta 1.0: gráficos resumidos sem séries históricas genuínas e arquitetura de acessibilidade, SEO e performance ainda incompleta.
- Beta 2.0 parcial: houve avanço para valores em centavos inteiros, seleção de mês, edição, preferências, PT/EN/ES, tema escuro e ícones. Entretanto, arquivos estáticos com estado global `window.KX`, armazenamento local optativo e validação no cliente **continuam inadequados para produção financeira**.
- Beta 2.0 parcial: verificar de verdade correção de CRUD, navegação, estado do modal, teclados, dark mode, excesso de re-renderização, date handling, localStorage, CSS responsivo, recorte do logo, proteção XSS e consistência de traduções. A verificação sintática de JS não significa teste funcional, acessibilidade ou segurança.
- Verificar também: datas de meses passados/futuros, timezone, seletor de meses, categorias traduzidas, cálculos com zero e números negativos, ID de registros, estado após exclusão, browser back/forward, scroll, foco, tabulação e exibição de valores grandes.

Entregue `docs/AUDITORIA_LEGADO.md` com achado, severidade `crítico/alto/médio/baixo`, arquivo/linha ou função, reprodução, impacto, correção adotada, teste de regressão e estado. Inclua `docs/DECISOES_ARQUITETURA.md`, explicitando reuso versus substituição. **Não confunda auditoria estática com pentest profissional.**

## 3. ESCOPO EM CAMADAS — NÃO IMPLEMENTAR TUDO COMO FACHADA

**P0 — Entregar funcional, completo, bonito e testado neste Beta 2.0:**
- Landing page institucional real, com proposta, recursos disponíveis, prévia do app, roadmap honesto, FAQ, privacidade contextualizada e CTAs operantes.
- Área do aplicativo **demo claramente identificada**, navegação entre Visão Geral, Finanças, Compras, Metas, Simuladores, Notícias/Contexto Econômico e Preferências (notícias conforme P1 abaixo; rota pronta sem fingir rede se indisponível).
- Dashboard financeiro com seleção de período/mês, receitas, despesas, fluxo líquido (não “saldo bancário”), histórico, categorias, progresso de metas, movimentações e ações rápidas.
- Movimentações manuais: CRUD completo; descrição, valor, tipo, categoria, data, filtros, busca, ordenação; validação e mensagens; cálculo correto por período.
- Compras planejadas: CRUD; nome, preço estimado, valor reservado, aporte mensal, prioridade, data/meta, vínculo com meta se viável; cálculo do tempo restante e impacto no orçamento, sem inferir capacidade de poupar quando dados insuficientes.
- Metas financeiras: CRUD; objetivo, valor alvo, acumulado, prazo opcional, progresso e previsão determinística transparentes.
- Simuladores: meta/poupança, comparação simples à vista x parcelado com juros/custos explícitos, cenários de poupança; exibir fórmulas, hipóteses, limitações e como são obtidos resultados.
- Preferências: idioma, tema claro/escuro **real**, apresentação compacta se houver valor, widgets visíveis/ocultos, consentimento para persistência de dados fictícios, reset de demo e opções de privacidade coerentes.
- Internationalização real de interface, formatos e erros: `pt-BR` (padrão), `en-US`, `es-ES` (ou locale espanhol explicitamente escolhido); tradução completa do escopo P0.
- Branding da imagem: símbolo K, wordmark KERDEX, app icon, favicon, PWA manifest correto, banners derivados com boa nitidez.
- Mobile-first, acessibilidade, desempenho e testes automatizados definidos abaixo.

**P1 — Implementar no beta se existir fonte legalmente utilizável e integração estável, priorizando arquitetura/UX mesmo quando depender de configuração externa:**
- **KERDEX Mundo / Radar Global:** notícias econômicas e políticas internacionais relevantes para mercados; busca, filtros por país/região, tema, idioma, fonte, data, ativos/setores; feed confiável; origem, links e atualização explícitos; **sem afirmar impacto causal comprovado apenas por coincidência**. Inicializar com feed público real permitido e testável se viável; caso contrário demonstrar feed fictício inequivocamente identificado, manter adaptador pronto e documentar bloqueios.
- **KERDEX Mercados / Observatório:** lista de ativos (Brasil e internacionais), categorias, câmbio, índices, ETFs, FIIs, ações, renda fixa, fundos, cripto, commodities e títulos segundo cobertura efetiva; tela de detalhes com metadata, cotação histórica onde legal, fonte, timestamp, moeda e status `real/atrasado/demo`. Watchlist manual; indicadores explicáveis; não prometer todas as categorias sem provedores.
- **KERDEX Insights (educacional):** comparação estruturada de cenário, fundamentos básicos, riscos, concentração, custo, liquidez, horizonte, macro e incerteza. Proibir “compre X hoje”, promessas de retorno ou recomendação personalizada regulamentada sem análise jurídica e capacidade operacional.
- **KERDEX Links de Produtos:** usuário cola URL de produto; salvar e validar link, domínio e variante; captura automática de preço/metadados apenas via API autorizada ou parceria; fallback para entrada manual; nenhuma coleta perigosa via fetch arbitrário do backend. Preparar comparador de ofertas, histórico de preços e alertas para versões futuras.
- Preparar catálogo/contratos de provedores; atualizar e cachear dados fora das solicitações do navegador quando autorizado.

**P2 — Preparar integração/documentação e telas de roadmap, mas NÃO fingir funcionalidade pronta:**
Open Finance e bancos/corretoras; cotações profissionais em tempo real; compra/venda/executar ordens; pesquisa e backtesting avançado; portfolio global automatizado; imposto de renda; IA financeira com memória e agentic workflows; recomendações personalizadas; análise de sentimento e causalidade complexa; monitoramento massivo de e-commerces e afiliados; price alerts reais; Academy em vídeo; tracking de delivery/garantia; TradingView-like profissional; comunidade; famílias e marketplace; app mobile nativo, push, pagamentos e assinaturas. Cada item deve entrar no `docs/ROADMAP.md` com dependências, riscos e custo preliminar.

**Não permitir que P1/P2 causem atraso ou degradação do P0.** Implementar módulos completos e bem isolados em vez de dezenas de cards decorativos. Feature flags para integrações e recursos incompletos.

## 4. MÓDULO CRÍTICO DE DADOS EXTERNOS — NOTÍCIAS, ECONOMIA, ATIVOS E PRODUTOS

### 4.1 Regras comuns para toda integração
Arquitetura de adaptadores `Provider -> Ingestion -> Normalization -> Provenance -> Persistence/Cache -> Domain Service -> API -> UI`. O frontend **não** contém chaves; URLs, API keys, permissões e limites são verificados; suporte a timeout, retries com backoff e jitter, circuito de falha quando adequado, rate limits, cache TTL diferente para cada dado, ETag, jobs idempotentes, deduplicação, dead-letter/reprocessamento quando realmente necessário, métricas e alertas sem informação pessoal. Nunca fazer scraping agressivo, burlar paywalls, contornar CORS ou redistribuir dados sem licença.

**Todo registro externo importante deve guardar:** `provider`, `original_url/identifier`, `source_name`, `source_country`, `source_language`, `retrieved_at`, `published_at` (se notícia), `observed_at`/`as_of` (se cotação), `license/usage_status`, `market_timezone`, `exchange`, `native_currency`, `freshness`, `status` (`live/delayed/stale/demo/unavailable`), `data_quality` e `last_error` técnico restrito. Separar hora de publicação de hora de coleta e de preço. Horários em UTC no armazenamento e apresentação na timezone escolhida; não inferir “em tempo real” da frequência de atualização da página.

**Matriz de provedores**: gerar `docs/PROVEDORES_DADOS.md` com cobertura geográfica, classes de dados, API/site oficial, autenticação, preço/plano pesquisado e data de consulta, limite, latência, licença, redistribuição, atribuição, armazenamento, uso de IA, termos, risco de descontinuidade, fallback e decisão (`selecionado`, `candidato`, `bloqueado`, `mock`). Sem preços/termos inventados; quando informação não puder ser verificada, indicar pendente.

### 4.2 Notícias e acontecimentos globais
Precisamos de cobertura que vai além de Bolsa e preços: decisões de bancos centrais, inflação, juros, emprego, PIB, câmbio, commodities, cadeias de suprimentos, sanções, guerras e tensões geopolíticas, desastres, medidas fiscais, regulação, política internacional, tecnologia/IA, energia e temas que **potencialmente** alteram resultados de empresas, setores e classes de ativos.

Desenhar e implementar UI de **Radar Global**, com:
- Cards/lista em layout mobile e desktop; fontes, títulos, resumos breves próprios quando permitidos, tags, região, idioma, horário, link original, fonte visível e classificação.
- Filtros: Brasil, Américas, Europa, Ásia-Pacífico, Oriente Médio, África, Mundo; relevância temática, setores/ativos, idiomas e janelas de tempo.
- Pesquisa textual, ordenação cronológica, favoritos e configuração de interesses. Sem confundir popularidade com relevância.
- Deduplicação e agrupamento de matérias sobre o mesmo evento; atributos `relato`, `fato confirmado`, `alegação`, `opinião`, `atualização/correção`, quando baseados em critérios verificáveis; não inventar consenso.
- Separar **notícia** de **“possíveis canais de impacto no mercado”**: exemplos com linguagem probabilística, horizontes e ativos potencialmente afetados, cenário alternativo, fontes e limites; sem recomendação automática de compra.
- Priorizar multi-fonte, contexto e qualidade em vez de usar engajamento como indicador de verdade.
- Regras de direitos autorais: título/links/metadados conforme termos; não espelhar o texto integral de veículos, não remover atribuição nem redistribuir material licenciado sem autorização. Se usar IA para resumo, manter vínculo às fontes e evitar alucinações.
- Avisos para fonte indisponível, última sincronização, atraso, falhas, data/hora e modo demonstração.
- Degradar graciosamente: se feed falhar, exibir último dado permitido com etiqueta de desatualização, ou estado vazio + fonte, nunca notícia sintetizada como se fosse real.

Pesquisar provedores e documentação oficial: GDELT (monitoramento de eventos e cobertura; verificar versão/termos), RSS autorizados e APIs de notícias licenciadas; consultar RSS/feeds oficiais de organismos públicos quando relevante. Se houver custo ou restrição de uso, implementar adaptador/fixture em vez de fingir acesso.

### 4.3 Indicadores macroeconômicos e calendário global
Criar modelo para país, região, indicador, unidade, frequência, período de referência, valor, revisões, calendário de divulgação, fonte, timezone e data de atualização. Brasil: avaliar séries oficiais de Banco Central/IBGE (sob critérios técnicos/termos). Exterior: avaliar FRED, SEC EDGAR, ECB/Eurostat, IMF, World Bank, OECD e fontes oficiais correspondentes. Não confundir dados econômicos diários com cotações instantâneas. Comparações entre regiões exigem unidades, metodologias e séries compatíveis.

### 4.4 Pesquisa de investimentos globais e análise responsável
Modelar instrumentos por identificadores robustos: `instrument_id` interno; `symbol + MIC/exchange + country` (ticker isolado não é chave global); ISIN/FIGI quando licenciado/disponível; classe, subtipo, emissor, exchange, setor, moeda nativa, calendário de negociação, timezone, corporate actions, data provider e status.

Planejar cobertura por módulos separados, conforme dados permitirem: ações brasileiras e globais, FIIs, REITs, ETFs, fundos, títulos públicos/privados, índices, pares FX, commodities, cripto e derivativos com limites de licenciamento/risco. **Não indicar suporte real para um mercado sem integração verificada.**

Camadas de análise:
1. *Descritiva*: preço/data/fonte, histórico, indicadores financeiros verificáveis, liquidez, custos, riscos e volatilidade passada.
2. *Comparativa*: benchmarks adequados, moeda, período, benchmark e dividendos/ajustes quando aplicável; cuidado com sobrevivência e dividendos.
3. *Educacional*: significado de P/L, P/VP, DY, duration, drawdown, etc., com glossário.
4. *Cenários*: cenários condicionalmente calculados, premissas, intervalo, sensibilidade e atualização; rentabilidade passada não garante futura.
5. *Avançada/futura*: portfólio, backtests realistas (custos, impostos, lookahead bias, sobrevivência), simulações, pesquisa fundamentalista e técnica, score de oportunidade com explicação auditável.

**Nunca fabricar recomendações “melhor ação para comprar” nem predizer retorno como certeza.** Recomendações e aconselhamento de valores mobiliários personalizados podem constituir atividade regulada; exigir parecer de conformidade aplicável, políticas de conflito de interesse e origem dos dados antes de habilitar. Iniciar com ferramentas educativas/descritivas e análise de cenários neutra.

Dados B3 e outras bolsas podem demandar licenças específicas para exibição/redistribuição; calcular em `docs/PROVEDORES_DADOS.md`. Dados do SEC EDGAR não são feed de cotação. Associar claramente periodicidade à classe de dado. Nunca chamar snapshots atrasados de “tempo real”.

### 4.5 Integrações e monitoramento de produtos
O usuário deve conseguir registrar **produto específico**, variante, modelo, capacidade, cor, condição (novo/usado/recondicionado), região, loja, URL, preço, frete estimado, juros, desconto, cashback, cupom quando verificado, data e disponibilidade. Diferenciar o **preço desejado informado pelo usuário** do **preço observado por fornecedor**.

Implementar vínculo compras-finanças: orçamento disponível calculado com regras explícitas; metas de aporte; simulação de compra à vista/parcelada; alerta de risco de comprometer despesas essenciais quando a informação suportar; prioridade das compras e planejamento multitemporal. Não incentivar endividamento.

**Segurança de URL:** restringir protocolo a HTTPS (HTTP apenas se explicitamente necessário e justificado), validação, domínio, IPs privados/loopback/link-local, DNS rebinding, redirects, URLs de cloud metadata, tamanho e tempo de resposta e tipos MIME; preferir allowlist de APIs de parceiros, nunca fetch arbitrário que possibilite SSRF. Não usar CORS como barreira de segurança. URLs fornecidas por usuário não devem gerar HTML executável. Não baixar imagens remotas sem checagem e licença.

Provedores: integrações oficiais de varejistas/marketplaces, feeds afiliados permitidos e links compartilhados; obedecer termos, estoque, locais, moeda e limitações. Não afirmar “menor preço da internet” com cobertura parcial. Histórico e alertas só após armazenamento/autorização e jobs realmente implementados. O **comparador deve considerar frete, tributos, variante, condição, vendedor e custo total**, não apenas preço exposto.

## 5. ARQUITETURA PROFISSIONAL, SIMPLES E EXPANSÍVEL

Preferência inicial: **monólito modular**, com boundaries claros; evitar microsserviços, Kubernetes, event bus e custos de produção desnecessários nesta etapa.

Stack candidata, sujeita a justificativa pela auditoria e à versão estável verificada: `Next.js + React + TypeScript` com App Router, Tailwind CSS e design tokens; `PostgreSQL` + ORM/migrações (Prisma ou Drizzle, escolha justificada); validação por `Zod`; testes `Vitest`/Testing Library e `Playwright`; lint, formatting, TypeScript strict. Backend dentro do projeto/rotas server-side inicialmente, com camadas de domínio e serviços independentes do framework. Escolha biblioteca madura de autenticação **somente se houver área de contas reais neste escopo**. Evitar dependências sem necessidade, SaaS pago por conveniência e pacotes obsoletos. Se o ambiente não permitir infraestrutura/serviços, entregar modo demo completamente funcional e um esqueleto de produção documentado — nunca um cadastro falso que pareça guardar dados reais.

**Domínios separados:** `core/config`, `auth/identity` (futuro ou real quando operacional), `finance/ledger`, `budgets`, `goals`, `purchases`, `products`, `market-data`, `news`, `macroeconomics`, `investments`, `provider-adapters`, `preferences`, `localization`, `audit`, `feature-flags` e `ui/design-system`.

Proponha estrutura concreta de arquivos, sem overengineering. Separar DTOs, schemas, regras de negócio puras, serviços, persistência e apresentação. API versionada (se existir API), contrato explícito, erros tipados e rate limits. Proibir `any` não justificado, segredos no client, catch silencioso, lógica financeira espalhada em componentes, `dangerouslySetInnerHTML` sem sanitização verificada, `eval`, dependências de script CDN sem controle. Persistência de demo, quando ativada, pode ser local e **somente para dados fictícios**, com botão de apagar e mensagem inequívoca. Dados reais exigem backend seguro e autenticação verdadeira.

### 5.1 Modelos mínimos do domínio
- `User`/`Profile` (apenas para backend real), `Workspace`, `Membership`, `Preference`, `Consent`.
- `FinancialAccount` (conta manual, nunca afirmar conexão bancária), `Transaction`, `Category`, `Budget`, `RecurringRule` (preparação), `Goal`, `GoalContribution`.
- `PurchasePlan`, `Product`, `ProductVariant`, `Merchant`, `Offer`, `ObservedPrice`, `Coupon` (futuro), `PriceAlert` (futuro).
- `NewsSource`, `Article`, `StoryCluster`, `Event`, `Entity`, `ArticleAssetLink`, `EconomicIndicator`, `EconomicObservation`, `EconomicRelease`.
- `Instrument`, `Listing`, `Quote`, `HistoricalBar`, `CorporateAction`, `Watchlist`, `WatchlistEntry`, `Portfolio` (futuro), `Position` (futuro).
- `DataProvider`, `IngestionRun`, `SourceAttribution`, `DataQualityFlag`, `AuditEvent`.

Definir diagramas ER mínimos, constraints, índices e migrações apenas para entidades efetivamente implementadas; as futuras entram na documentação de contratos, não como dezenas de tabelas vazias. Definir política de exclusão, idempotência e versionamento; segregação de acesso no servidor.

### 5.2 Matemática financeira e internacionalização
Para moeda use `Decimal` ou inteiros em **unidades mínimas** com código ISO 4217 e escala explícita por currency — nem todas têm 2 decimais. Para operações financeiras multiplataforma definir arredondamento, impostos e câmbio. Não somar ativos de moedas distintas sem conversão com `rate`, `as_of`, `source`, `base/quote`, margem e precisão. Para demo BRL, centavos inteiros como no Beta 2 parcial são adequados; não reverter a floats para ledger. Datas do tipo *calendar date* não devem passar por fuso causando mudança de dia; timestamps em UTC. `Intl.NumberFormat`, `Intl.DateTimeFormat`, preferências de usuário, separators, pluralização, nomes acessíveis, currency per record; internacionalização não se resume a traduzir textos.

## 6. EXPERIÊNCIA VISUAL E IDENTIDADE — UTILIZE A IMAGEM ENVIADA

A imagem enviada é um **brand board oficial de referência**, com símbolo K em degradês verdes, wordmark KERDEX, ícone quadrado com cantos arredondados/fundo verde profundo, versão clara/escura, banners e mockup mobile. **O proprietário do projeto autorizou utilizar essa imagem como referência e reaproveitar elementos dela neste protótipo.**

Aplique:
- **Logo principal:** utilizar o símbolo K + wordmark KERDEX legíveis no canto superior da sidebar desktop; versão compacta na sidebar recolhida; mobile no topo ou drawer; footer institucional com marca e texto sóbrio. Evitar logomarca grande repetida em cada card.
- **Favicon e app icon:** preferência explícita pelo K estilizado em **fundo verde-escuro** (ícone do quadrado arredondado da imagem). Produzir favicon `16,32,48`, Apple touch `180`, PWA `192,512`, máscara safe-zone `maskable 512` e SVG de qualidade se for possível criar vetor fiel; fornecer PNG com fundo opaco e recorte sem bordas externas espúrias. Testar renderização real a 16x16.
- **Cores recentes da imagem:** `#052F24` verde profundo, `#16C060` verde vivo, `#1F2937` carvão, `#F5F7F6` neutro e `#FFFFFF` branco, **aproximadas às amostras do brand board**. O briefing anterior também sugere `#102B22`, `#183F31`, `#C8F35A`, `#F7F9F6`; harmonizar ambas as famílias por tokens de marca e semânticos. Verde-lima como destaque pontual com contraste; **não interpretar os HEX da imagem como valores cromáticos metrologicamente exatos**.
- **Banners:** preferir recortes trabalhados a partir do banner e símbolo com autorização do usuário; fazer crops/correções de nitidez e proporção, não colar captura inteira do board como conteúdo final. Criar hero original responsivo, tipografia forte, painéis com prévia real e composições em verde profundo; sem reproduzir marca/layout proprietário de terceiros.
- **Tipografia:** Manrope para chamadas e Inter para interfaces/dados, ou Inter unificada se for mais performática; números tabulares; layout com espaços generosos, grids, bordas 12–16 px, sombras mínimas e ícones SVG consistentes.
- **Temas:** tema claro de alto contraste por padrão, tema escuro verdadeiramente completo; cores semânticas para alertas, perdas e sucesso; azul/informação, âmbar/atenção, vermelho/perda e verde/positivo sem depender só da cor.
- **Tom:** brasileiro, sério, amigável, sem jargão indevido e sem copy como “fique rico”, “lucro garantido” ou “IA recomenda compra infalível”.
- **Design references** para estudar princípios, **não copiar**: Nubank (clareza), Organizze/Mobills (finanças), YNAB (orçamento), Monarch Money (visão consolidada), Kinvo (carteira), TradingView (dados densos dentro de módulo avançado), Notion (personalização). Produzir aparência original KERDEX.
- **Pequenos detalhes profissionais:** skeleton/loading, toast acessível, feedback consistente, empty/error/offline state, undo para deleções quando viável, ordenação visível, campos com unidades, gráficos com dados/legendas, precisão de valores, “por que este cálculo?”, navegação previsível e progress disclosure.

## 7. RESPONSIVIDADE É CRITÉRIO BLOQUEANTE, NÃO AJUSTE COSMÉTICO

Construir mobile-first e testar, no mínimo, `320, 360, 375, 390, 414, 480, 600, 768, 820, 1024, 1280, 1440, 1920 e 2560 px`; também alturas curtas, landscape, zoom `200%` e `400%` quando aplicável, teclado virtual e fontes grandes. Adaptar tamanhos intermediários fluidamente usando CSS grid/flex, `minmax`, `clamp`, media/container queries apropriadas, safe areas e densidade de informação, **sem criar overflow horizontal do documento**. Scroll horizontal interno apenas quando inevitável e explicitamente sinalizado para tabela/dados densos.

**Desktop >= aproximadamente 1200:** sidebar de navegação recolhível, topo leve, conteúdo central responsivo e painéis hierarquizados. Não deixar cards ultralargos ou vazios em monitores 4K.
**Tablet 768–1199:** sidebar compacta ou drawer conforme espaço, tabela responsiva e filtros quebrando linha sem sobreposição.
**Celular 320–767:** sidebar vira drawer acessível; barra inferior com no máximo 4–5 destinos prioritários se útil, com aba “Mais”; logo legível; um CTA principal por área; cards empilhados; tabelas transformadas em linhas/cards; filtros recolhíveis; formulários em tela inteira ou bottom sheet conforme acessibilidade; navegação por polegar; no máximo uma coluna nos fluxos essenciais; valores não truncados sem alternativa de leitura.

**Fluxos obrigatórios em mobile:** cadastro/edição/exclusão de transação, criação de meta, produto linkado, simulador, filtro de mês, notícia com fonte, mudança de idioma, tema, reset, formulário com mensagens de erro, modal com teclado e retorno. Respeitar keyboard focus trap em diálogos, `Escape`, foco de retorno, `aria-live`, touch target em geral ~44 px quando apropriado e `prefers-reduced-motion`. Meta WCAG 2.2 AA com validação automática e manual (leitor de tela, navegação de teclado e contraste). Registrar prints reais de mobile/tablet/desktop e corrigir layouts, não apenas afirmar responsividade.

## 8. SEGURANÇA — PADRÃO DE FINTECH, SEM PROMETER O QUE NÃO FOI AUDITADO

**Modelo de ameaças** obrigatório (`docs/THREAT_MODEL.md`) para dados financeiros pessoais, autenticação, sessão, autorização entre usuários, injeção, XSS, CSRF (quando aplicável), SSRF em URL de produto, IDOR/BOLA, extração por endpoints, brute force, abuso de API, vazamento em logs, supply chain, e comprometimento de provedor externo. Referenciar requisitos apropriados do **OWASP ASVS 5.0** e recomendações da ANPD; escolher criticidade por ameaça, não só checklist.

Medidas para implementar/testar no escopo real:
1. **Nenhum dado financeiro real** em demo pública. Dados seed fictícios com rótulo em todas as telas; reset; sem coleta invisível ou analytics com PII.
2. Para contas reais, **autenticação gerenciada robusta**, passkeys/MFA quando suportados, recuperação segura, sessões em cookie `HttpOnly + Secure + SameSite` conforme modelo e proteção CSRF adequada. **Não implementar auth caseira** ou fake login.
3. **Autorização no servidor por objeto e tenant** em todas as rotas, isolamento usuário/workspace, RLS onde fizer sentido e testes explícitos de acesso cruzado, sem confiar em filtros frontend.
4. Validação no cliente **e** servidor por schema, comprimento, tipos, faixas, ownership, integridade e normalização de dados. Escapar saída/contexto, não injetar HTML arbitrário; CSP com nonces/hashes compatível com framework, security headers definidos no servidor, HTTPS/HSTS no deploy real, configurações de CORS mínimas.
5. Links e integrações protegidos de **SSRF**, redirects abusivos, hosts internos/metadata, DNS rebinding, tamanhos de resposta, timeouts e rate limits; endpoints de ingestão restritos a adaptadores conhecidos.
6. `secrets` somente em servidor/gestor de segredos/ambiente; `.env.example` sem credenciais, `.gitignore`, verificação de vazamento. Logs sem saldos pessoais/identificadores sensíveis/tokens. No secrets em imagens ou source maps client.
7. Dependências pinadas via lockfile, auditoria de pacotes, SAST/dependency scan, CI, permissões mínimas, migrations reversíveis, backup/restauração **somente se existir DB real**.
8. Princípios LGPD: minimização, finalidade, transparência, escolha real e revogação de consentimento, retenção/deleção/exportação conforme escopo. Não publicar política mentirosa ou afirmar “certificado”.
9. Mensagens de erro sem stack traces ou objetos confidenciais para usuário. Auditar eventos relevantes sem criar rastreamento invasivo.
10. Feature flags e kill switch para feeds/integrações. Não usar plugins/SDKs analytics/marketing sem base e gestão de consentimento quando exigida.

**Critério de lançamento:** sem pentest, revisão de segurança, análise de risco de privacidade e teste de isolamento, **não rotular como pronto para receber dados financeiros sensíveis de terceiros**. O beta demo não pode herdar a palavra “seguro” como selo de garantia.

## 9. ACESSIBILIDADE, SEO, DESEMPENHO E QUALIDADE

- Meta WCAG 2.2 AA; semantic HTML, landmarks, heading hierarchy, labels reais, foco visível, alt apropriado, links descritivos, ícones com texto, gráficos com tabela equivalente, contraste verificado, zoom, redução de movimento.
- Site institucional indexável: SSR/SSG adequado, titles/descriptions/OG, favicon, sitemap/robots quando público; app privado não indexado; canonical/hreflang conforme idiomas publicados; idioma do conteúdo consistente; conteúdo genuíno, sem palavras-chave artificiais.
- Core Web Vitals alvo em ambiente medido: LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,1 (limiares de referência, não prometer sem medir); lazy loading, imagens responsivas, compressão, otimização de fontes, evitar hydration custosa, renderização proporcional ao conteúdo.
- Não usar imagens enormes do board como logo; criar derivados otimizados sem violar identidade. Prefira SVG fiel para wordmark/símbolo quando viável e PNG nítido nos tamanhos exigidos.
- Testes de unidade para cálculos (zero, arredondamento, negativos, extremos, múltiplas moedas, datas, vencimentos); integração para provider adapters com fixtures e fault injection; e2e Playwright para fluxos P0; acessibilidade `axe`/Lighthouse e inspeção manual; testes visuais com screenshots em resoluções listadas.
- Configurar scripts `dev`, `build`, `lint`, `typecheck`, `test`, `test:e2e`; CI executável, sem testes fictícios que só assertam que a página renderiza. Executar todos e relatar resultados exatos; se algo não rodar por limitação de ambiente, registrar o bloqueio e não declarar aprovação.

## 10. INTERNACIONALIZAÇÃO E ESTRUTURA GLOBAL

Brasil é o mercado inicial, mas já preparar: `pt-BR`, `en-US`, `es-ES`; timestamps UTC, timezone por pessoa, moedas por registro (BRL, USD, EUR e futuras), país do usuário, locale, milhares/decimais, código de ativo + bolsa e país, feriados/calendários de negociação e provedores regionais. Estrutura para políticas/regulamentação por jurisdição e consentimentos granulares. Evitar assumir CPF obrigatório, CEP exclusivamente brasileiro, conta bancária brasileira, 2 decimais para toda moeda ou que símbolos globais de ativos sejam únicos. Evitar misturar cotação cambial com mudança de preferência de idioma.

No escopo inicial, usar BRL nos dados financeiros fictícios; mudar idioma não muda valor econômico nem converte moeda. Se a UI de câmbio existir, só converter com taxa/fonte/hora válidas e explicitar que é indicativa e possível defasagem.

## 11. IDEIAS DE DIFERENCIAÇÃO PARA O BETA — ENTREGAR SÓ SE REALMENTE FUNCIONAREM

- **KERDEX Compass:** prioridade contextual discreta no dashboard: “Próxima ação útil”, baseada em regras determinísticas explícitas (não atribuir à IA), ex.: meta perto do prazo ou compra que excede o aporte; usuário pode esconder/editar.
- **KERDEX Explain:** botões “Como foi calculado?” em cards, simuladores e indicadores; exibir fórmula, período, fonte e limitação.
- **KERDEX Compare:** lado a lado de 2–3 planos de compra ou cenários de poupança, sem overengineering.
- **KERDEX Radar:** mapa/agrupamento de eventos de impacto econômico **potencial** com fontes e filtro temático; IA e score ficam desligados se não houver base real.
- **KERDEX Data Trust:** badges discretos de proveniência e atualização, audit trail de fornecedores e área “Sobre estes dados”.
- **Dashboard adaptativo:** preferências e ordem de módulos básicas que mudem de verdade o conteúdo exibido; não UI decorativa.

Não sacrificar clareza nem segurança por “disrupção”. Features inspiradas em produtos existentes devem ser originais e simples de aprender.

## 12. CRITÉRIOS DE ACEITE FUNCIONAIS (EXECUTAR)

**Ledger:** ao adicionar R$ 0,10 + R$ 0,20, resultado R$ 0,30 exato; operações de meses diferentes não contaminam mês atual; exclusão/edição atualizam dashboard; valores inválidos não são aceitos; “resultado do mês” não é declarado saldo bancário; reset não deixa dados parciais; histórico verídico do dataset mostrado.

**Compras:** a parcela não pode “ficar mais barata” escondendo juros; frete e total aparecem quando dados existem; para `aporteMensal=0` e faltante>0 prazo é indeterminado; ao atingir valor alvo prazo=0; produto com URL inválida é rejeitado; links são seguros; preço observado de parceiro vs informado manualmente separado.

**Metas:** progresso limitado visualmente a 100%, mas excedente não desaparece dos números; datas e meses obedecem locale/timezone; divisão por zero tem mensagem.

**Notícias:** cada notícia real possui fonte, URL, horário de publicação quando fornecido e status de atualização; nunca exibe fixture como notícia atual. Erro de provedor não quebra dashboard. Conflitos entre versões de matérias não geram narrativas falsas. Nenhuma notícia é reproduzida integralmente sem permissão.

**Mercados:** cotações com classe, bolsa, moeda, data/fonte/status; nenhuma fonte não implementada recebe etiqueta “ao vivo”; dados desatualizados rotulados; ticker duplicado em bolsas diferentes não conflita.

**UX:** nav item consistente, browser back/forward funcionando, foco e aria corretos, mobile 320 sem overflow, tema real em cada rota, tradução sem chaves cruas, dialog fecha/retorna foco, botões têm ação ou estão honestamente indisponíveis.

**Segurança:** testes negativos de autorização (se backend real), SSRF para input de URL, XSS contra descrições, validação de inputs, secrets scanning; logs sem PII; demo sem requisições de credenciais bancárias.

## 13. COMO EXECUTAR O TRABALHO SEM ME DEVOLVER APENAS UM PLANO

1. **Inventariar todos os arquivos anexos**, extrair ZIPs e ler código/briefing/imagem.
2. Produzir uma **síntese curta** do diagnóstico e lista priorizada de tarefas.
3. **Implementar efetivamente o código** em um repositório/projeto pronto para executar. Preferência por conservar o histórico e incluir README de migração dos protótipos estáticos, em vez de apagar o legado sem explicação.
4. Dar prioridade P0 completa, modular, segura e testada. Depois P1 em componentes consistentes e provedores apenas quando houver autorização/termos viáveis, API key fornecida ou fonte pública compatível; registrar bloqueio e criar adapters testados com dados fake rotulados.
5. Gerar ativos de marca a partir dos arquivos disponibilizados (logo, ícones, banner, light/dark) e usá-los na interface real.
6. Criar ou atualizar testes; executar build, typecheck, lint, testes unitários/e2e e inspeção visual via navegador com screenshots em viewport variadas. Corrigir falhas encontradas.
7. Entregar relatório de mudanças com arquivos, instruções para instalar/rodar (`npm install` e comandos exatos), prints, problemas pendentes, evidências de testes e **o que está real vs demo vs previsto**.
8. Incluir `docs/AUDITORIA_LEGADO.md`, `docs/ROADMAP.md`, `docs/ARQUITETURA.md`, `docs/THREAT_MODEL.md`, `docs/PROVEDORES_DADOS.md`, `docs/TESTES_E_ACEITE.md`, `docs/DECISOES_ARQUITETURA.md`, `.env.example`, `README.md`, documentação de uso e licença dos ativos de terceiros, quando aplicável.
9. Se o trabalho for grande, avance em **etapas verificáveis dentro do mesmo repositório** e conclua com o máximo implementado, sem parar na documentação. Um beta funcional com menos módulos vale mais que 30 telas estáticas sem função.

## 14. RESTRIÇÕES DE CUSTO E TRANSPARÊNCIA

Fundador sozinho e orçamento mínimo. Priorizar software open source consolidado, deploy barato, infraestrutura gerenciada com cotas claras, cargas de dados cacheadas e consentimento. Não selecionar 8 SaaS pagos sem justificativa. Não inventar custos “sempre grátis”: planos, cotações e termos devem ser consultados antes de apresentar preços. Produto inicialmente em português brasileiro, pensado para lançamento internacional, sem comprometer obrigações futuras de proteção de dados.

**Crie um arquivo `docs/CUSTOS_E_OPERACAO.md`** com infraestrutura mínima, uso de IA opcional/desativado por padrão, dependências com preço variável, execução local e cenários de crescimento. Diferencie protótipo gratuito de operação comercial segura. Para notícias, dados B3/globais e preço de produtos, estime **custos por provedor** apenas quando confirmados ou sinalize “a cotar”.

## 15. REGRAS FINAIS ABSOLUTAS

- Use a marca **KERDEX** de ponta a ponta. Não renomear para ORBE.
- A imagem anexada é a fonte prioritária dos ativos gráficos; preservar K estilizado e fundo verde do app icon.
- Não copiar designs proprietários de outras empresas.
- **Nenhuma ação “salva” sem persistência real**: se for demo memória, informar e não garantir continuidade.
- Nenhuma notícia/cotação/produto inventado deve ser apresentado como dado externo real.
- Nenhuma “dica de investimento” personalizada ou trading com execução de ordens sem avaliação regulatória e implementações apropriadas.
- Não chamar de “certificado” ou “seguro para produção” antes de verificação independente.
- Segurança, responsividade e qualidade de experiência são bloqueadores, não tarefas opcionais.
- **Entregue o Beta 2.0 executável com código-fonte, documentação e testes**, além de lista completa de futuras integrações.

### FONTES OFICIAIS A CONSULTAR E CHECAR TERMOS (não equivalem a licenças gratuitas)

- OWASP ASVS 5.0 — https://asvs.owasp.org/
- OWASP SSRF Prevention — https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html
- W3C WCAG 2.2 — https://www.w3.org/TR/WCAG22/
- ANPD segurança/LGPD — https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte
- Banco Central Open Finance — https://www.bcb.gov.br/meubc/faqs/s/open-finance
- CVM consultores — https://www.gov.br/cvm/pt-br/assuntos/regulados/consultas-por-participante/consultores-de-valores-mobiliarios
- SEC EDGAR APIs — https://www.sec.gov/search-filings/edgar-application-programming-interfaces
- FRED API — https://fred.stlouisfed.org/docs/api/fred/overview.html
- ECB Data API — https://data.ecb.europa.eu/help/api/data
- GDELT dados — https://gdeltproject.org/data.html
- B3 — pesquisar documentação e regras atuais de licenciamento/redistribuição de market data no site oficial https://www.b3.com.br/

**INICIE AGORA: examine primeiro os artefatos, apresente uma breve auditoria priorizada e em seguida PRODUZA O CÓDIGO real do KERDEX Beta 2.0 com foco em acabamento visual, mobile e segurança.**

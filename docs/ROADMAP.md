# KERDEX — recursos previstos para próximas versões

## P0 — antes de guardar informações reais
- Back-end real, autenticação segura com sessões protegidas, MFA/2FA opcional e recuperação de conta; separação lógica e isolamento de dados entre usuários com autorização testada no servidor.
- Modelagem de transações contábeis em inteiros/decimais, consistência monetária, reconciliação, lançamentos de investimentos, moedas e seus câmbios e auditoria histórica.
- Banco de dados com migrações versionadas, backup, restauração testada, minimização e retenção de dados, exportação e eliminação LGPD, modelo de consentimento.
- OWASP ASVS e threat modeling, avaliação de dependências, controles CI, testes de autorização, controles de abuso, políticas de log e resposta a incidentes; revisão por profissional de segurança independente.
- Base i18n com locale para todos os componentes, números, moedas, datas, RTL quando necessário, tradução apropriada do conteúdo externo mediante licenciamento.

## P1 — investimentos funcionalmente conectados a mercados
- Ativos de diversas bolsas e países com identificador de instrumento (ticker+bolsa/ISIN), corporate actions, dividendos, proventos, split, taxa/custos, rentabilidade total ponderada no tempo e por fluxo (TWR/XIRR), posição de compra e venda, impostos e multicâmbio histórico.
- Cotações por APIs licenciadas com limites, autenticação, horário e timezone de bolsa, precificação de títulos de renda fixa, transparência de atraso e status; nunca criar valores fictícios rotulados como reais.
- Fonte para fundamentos, demonstrativos e indicadores (por exemplo relatórios oficiais e bases públicas), critérios de qualidade e incerteza, comparação de setores/benchmarks, exploração gráfica e backtesting com limites.
- Integração Open Finance/corretoras com consentimento e contrato de provedor; importação OFX/CSV e conciliação antes de qualquer sincronização de saldos.
- Simulações financeiras avançadas: Monte Carlo explicitamente hipotético, análise de sensibilidade multidimensional, inflação por país, curva de juros, inflação, tributação por jurisdição, mudança de taxas e ativos no tempo; análise de risco e cenários baseados em dados licenciados (quando disponíveis).

## P1 — notícias KERDEX News
- Feeds licenciados mais abrangentes e fontes múltiplas em diferentes idiomas; ingestão em segundo plano, deduplicação, categorização editorial, relevância e relação verificável com cada ativo e região.
- Explicações por IA com citações verificáveis, transparência de incerteza, datas, fatos vs hipóteses, limites de aconselhamento; tradução dos títulos/trechos quando autorizada e auditada, respeitando direitos autorais.
- Calendário macro, alertas sob consentimento, comparação de fontes e conflitos, histórico de notícias; painel de preferências respeitando privacidade.

## P1 — planejamento de compras
- URLs de produto, extração autorizada por APIs de varejistas e programas afiliados, comparação SKU/EAN exata, frete, prazo, custo total, histórico e alertas, deduplicação e qualidade das ofertas.
- Comparação de pagamento à vista vs parcelado, projeção do orçamento, calendário de compras, custo de oportunidade e identificação de promoções enganosas com fontes confiáveis.

## P2 — educação, organização e trade
- Cursos, aulas, flashcards, revisão espaçada, trilhas e quizzes; dashboards de tarefas, agenda, hábitos; simulação de trading, diário de operações, risco de posição, replay de mercado e no-code backtesting.
- Personalização modular por widgets, regras e automações seguras, notificações e assistente de IA sob autorização granular.

## Princípio de lançamento
Priorizar **dados íntegros, segurança e clareza** à quantidade de funções. Investimentos manuais e KERDEX News ainda não demonstram a visão completa de integração com informações mundiais em tempo real.

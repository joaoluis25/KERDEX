# Provedores e proveniência

Nenhum provedor externo selecionado ou conectado. Pesquisa contratual, preços e termos atuais não foram confirmados nesta entrega; não se atribui licença gratuita a nenhum candidato.

| Candidato / site oficial | Cobertura | Autenticação, limites, latência, preço | Licença, redistribuição, cache e IA | Decisão / fallback |
|---|---|---|---|---|
| BCB — https://www.bcb.gov.br/ | Indicadores Brasil | Pendente por API | Pendente | Candidato; link oficial, feed indisponível |
| GDELT — https://gdeltproject.org/data.html | Eventos/notícias globais | Pendente | Direitos de veículos precisam de análise própria | Candidato; vazio explícito |
| ECB — https://data.ecb.europa.eu/help/api/data | Macro Europa | Pendente | Pendente | Candidato, desativado |
| FRED — https://fred.stlouisfed.org/docs/api/fred/overview.html | Séries macro | Chave/regras a validar | Dependente da série | Candidato, desativado |
| SEC — https://www.sec.gov/search-filings/edgar-application-programming-interfaces | Documentos EUA | Política de acesso a validar | Pendente | Candidato, desativado |
| B3 — https://www.b3.com.br/ | Mercado brasileiro | A cotar | Licenciamento/redistribuição pendentes | Bloqueado até contratação/verificação |
| APIs de varejistas | Produtos e preço observado | Parceiro a selecionar | Sem scraping ou coleta arbitrária | Manual disponível |

Notícias reais exigirão fonte, URL, published_at e retrieved_at, idioma, país e status. Cotações exigirão instrumento + bolsa + país, moeda, as_of, timezone, fonte e status real/atrasado/desatualizado. Falha nunca deve fabricar dado atual. Retentativas, TTL, circuit breaker e limites pertencem ao adaptador/servidor futuro; não são implementações atuais.

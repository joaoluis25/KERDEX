# Modelo de ameaças da demonstração

Ativos: estado fictício, integridade dos cálculos e preferências. Fronteiras: formulário/URL/localStorage → UI; navegador → servidor estático. Não há contas nem dados financeiros reais admitidos.

| Ameaça | Controle presente | Limite / evolução |
|---|---|---|
| XSS em nome/link | Escape contextual, HTTPS em links, CSP sem scripts inline, teste negativo | Strings HTML requerem cuidado em novas features; migrar componentes |
| SSRF em produto | Não existe requisição ao link; rejeita IP/credenciais/host local comum | Futuro backend requer allowlist, resolução DNS e bloqueio de redes privadas/redirects |
| IDOR/BOLA e sessão | Nenhuma API de registros ou login fictício | Bloquear lançamento de contas reais até auth gerenciada e testes entre tenants |
| Retenção sem consentimento | Registros não persistem por padrão; revogação remove chave | Preferências são locais; dispositivo compartilhado não é ambiente confidencial |
| Supply chain | Lockfile e npm ci; zero dependência runtime de terceiros | Atualizar e auditar também ferramentas de desenvolvimento |
| Vazamento de arquivos | Servidor permite somente arquivos públicos conhecidos | Usar hospedagem estática revisada em produção; não expor checkout inteiro |
| Provedor comprometido | Integrações desativadas | Validar licença, schema, limites, timestamp e origem antes de ligar |

Referências de projeto: OWASP ASVS 5.0 (validação, saída e autorização), OWASP SSRF Prevention e orientações ANPD. Não há alegação de conformidade verificada. MFA, cookies de sessão, CSRF, RLS, backups, restauração e retenção de backend só poderão ser validados quando esse backend existir. Testes de leitor de tela, revisão de privacidade e pentest independente permanecem requisitos de lançamento com dados sensíveis.

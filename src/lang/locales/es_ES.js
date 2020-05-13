/* Gogo Language Texts

Table of Contents

01.General
02.User Login, Logout, Register
03.Menu
04.Error Page
05.Agency Page
06.Agent Page
07.Plans Page
08.Transactions Page
09.Users Page
10.Subscriptions Page
11.Ratings Page
12.Issues Page
13.Months
14.Ads Page
15.Imob Agents
16.Dashboard
*/

module.exports = {
  /* 01.General */
  'general.copyright': 'Gogo React © 2018 All Rights Reserved.',

  'app.showing_results': 'Mostrando resultados de ',

  /* 02.User Login, Logout, Register */
  'user.login-title': 'Entrar',
  'user.register': 'Cadastrar',
  'user.not-registered-yet': 'Ainda não é cadastrado?',
  'user.forgot-password': 'Esqueci a senha',
  'user.email': 'E-mail',
  'user.password': 'Senha',
  'user.forgot-password-question': 'Esqueceu a senha?',
  'user.fullname': 'Nome Completo',
  'user.login-button': 'ENTRAR',
  'user.register-button': 'CADASTRAR',
  'user.reset-password-button': 'LIMPAR',
  'user.buy': 'COMPRAR',
  'user.username': 'Usuário',
  'user.reset-password': 'Recuperar Senha',
  'user.new-password': 'Nova Senha',
  'user.new-password-again': 'Repita a Nova Senha',
  'user.new-password-token': 'Código',
  'user.enter-email': 'Por favor, insira seu email',
  'user.enter-password': 'Por favor, insira sua senha',
  'user.invalid-email': 'Email inválido',
  'user.invalid-password': 'Senha deve conter mais de 3 caracteres',
  'user.accept-button': 'ACEITAR',
  'user.refuse-button': 'RECUSAR',
  'user.back-button': 'VOLTAR',
  'user.name': 'Razão Social',
  'user.fantasy_name': 'Nome Fantasia',
  'user.cnpj': 'CNPJ',
  'user.creci': 'CRECI',
  'user.zip_code': 'CEP',
  'user.street': 'Rua',
  'user.number': 'Número',
  'user.complement': 'Complemento',
  'user.district': 'Bairro',
  'user.city': 'Cidade',
  'user.state': 'Estado',
  'user.phone': 'Telefone',
  'user.confirm_password': 'Confirmar Senha',
  'user.dropzone': 'Selecione ou arraste sua logotipo',
  'user.rotate': 'Rotacionar',

  /* 03.Menu */
  'menu.app': 'Home',
  'menu.dashboard': 'Dashboard',
  'menu.agency': 'Imobiliárias',
  'menu.ad': 'Anúncios',
  'menu.ad-registered': 'Ativos',
  'menu.ad-sold': 'Vendidos',
  'menu.ad-disabled': 'Desativados',
  'menu.mydata': 'Meus Dados',
  'menu.profile': 'Cadastros',
  'menu.agent': 'Corretores',
  'menu.users': 'Usuários',
  'menu.users.sub': 'Cadastros',
  'menu.subscriptions': 'Assinaturas',
  'menu.plans': 'Planos',
  'menu.transactions': 'Transações',
  'menu.evaluations': 'Avaliações',
  'menu.issues': 'Problemas Relatados',
  'menu.properties': 'Imóveis',
  'menu.notifications_empty': 'Nenhuma Notificação a ser exibida',
  'menu.creci-requests': 'Atualizações de CRECI',
  'menu.waiting': 'Solicitação',
  'menu.corretagem': 'Solicitações de corretagem',
  'menu.ad-info-sold': 'Vendas informadas',

  /* 04.Error Page */
  'pages.error-title': 'Ooops... parece que ocorreu um erro!',
  'pages.error-code': 'Código do erro',
  'pages.go-back-home': 'Voltar para HOME',

  'creci.id': 'ID',
  'creci.status': 'Status',
  'creci.creci': 'Novo CRECI',
  'creci.agent-name': 'Nome do corretor',
  'creci.pending': 'Pendente',
  'creci.accepted': 'Aceito',
  'creci.revoked': 'Revogado',
  'creci.profile.name': 'Nome',
  'creci.old-creci': 'CRECI Antigo',
  'creci.new-creci': 'CRECI Novo',
  'creci.cellPhone': 'Celular',
  'creci.photo-creci': 'Foto CRECI Nova',
  'creci.photo-creci-old': 'Foto CRECI Antiga',
  'creci.photo-agent': 'Foto Corretor',
  'creci.info': 'Atualização de CRECI',
  'creci.datas': 'Dados',
  'creci.approve': 'Aprovar',
  'creci.reprove': 'Reprovar',

  /* 05.Agency */
  'agency.registered-agency': 'Imobiliárias Cadastradas',
  'agency.register-agency': 'Cadastrar Imobiliária',
  'agency.request-register-agency': 'Solicitação de Cadastro - Imobiliária',
  'agency.registry-agency': 'Cadastro - Imobiliária',
  'agency.registry-user': 'Cadastro - Usuário',
  'agency.awaiting-requests': 'Solicitações em aguardo',
  'agency.awaiting-link': 'Solicitação de vínculo',
  'agency.add-button': 'ADICIONAR NOVO',
  'agency.search': 'Pesquisar',
  'agency.credentials': 'Credenciais',
  'agency.password': 'Senha',
  'agency.confirm-password': 'Confirmar Senha',
  'agency.agency': 'Imobiliária',
  'agency.cnpj': 'CNPJ',
  'agency.zipcode': 'CEP',
  'agency.number': 'Número',
  'agency.street': 'Logradouro',
  'agency.address': 'Endereço',
  'agency.complement': 'Complemento',
  'agency.phone': 'Telefone',
  'agency.cellPhone': 'Celular',
  'agency.email': 'E-mail',
  'agency.creci': 'CRECI',
  'agency.city': 'Cidade',
  'agency.district': 'Bairro',
  'agency.uf': 'UF',
  'agency.state': 'Estado',
  'agency.status': 'Status',
  'agency.actions': 'Ações',
  'agency.datas': 'Dados',
  'agency.name': 'Nome',
  'agency.company-name': 'Razão Social',
  'agency.cancel-button': 'CANCELAR',
  'agency.active': 'Ativo',
  'agency.inactive': 'Inativo',
  'agency.linked-agents': 'Corretores Vinculados',
  'agency.registered-ads': 'Anúncios Cadastrados',
  'agency.link-button': 'VINCULAR',
  'agency.property-information': 'Informações do imóvel',
  'agency.sold': 'Vendido',
  'agency.property-type': 'Tipo do Imóvel',
  'agency.roof': 'Cobertura',
  'agency.concierge': 'Portaria',
  'agency.sale': 'Venda',
  'agency.rent': 'Aluguel',
  'agency.floor': 'Andar',
  'agency.useful-area': 'Área Útil',
  'agency.dorms': 'Dormitórios',
  'agency.suites': 'Suítes',
  'agency.bathrooms': 'Banheiros',
  'agency.car-space': 'Vagas para carros',
  'agency.furnished': 'Mobiliado',
  'agency.key-type': 'Tipo de chaves',
  'agency.accept-animals': 'Aceita animais',
  'agency.occupant': 'Quem ocupa',
  'agency.advertiser': 'Anunciante é',
  'agency.property-costs': 'Custos do imóvel',
  'agency.condominium-value': 'Valor do condomónio',
  'agency.property-sale-value': 'Valor de venda do imóvel',
  'agency.property-iptu-value': 'Valor do IPTU do imóvel',
  'agency.home-appliances': 'Eletrodomésticos',
  'agency.features-items': 'Características e itens',
  'agency.condominium-facilities': 'Instalações do condomínio',
  'agency.property-description-photos': 'Descrição e fotos do imóvel',
  'agency.property-sale-information': 'Informações de venda do imóvel',
  'agency.sale-reported-by': 'Venda reportada por',
  'agency.agent-name': 'Nome do Corretor',
  'agency.date': 'Data',
  'agency.sale-confirmed-by-the-advertiser-on':
    'Venda confirmada pelo anunciante em',
  'agency.deactivate': 'Desativar',
  'agency.back': 'Voltar',
  'agency.back-button': 'VOLTAR',
  'agency.my-cards': 'Meus cartões',
  'agency.refuse-agent': 'Deseja recusar vinculo de corretor?',
  'agency.approval-agent': 'Deseja aceitar vinculo de corretor?',
  'agency.unassign-agent': 'Deseja desvincular o corretor?',

  /* 06.Agents */
  'agents.registered-agency': 'Imobiliárias Cadastradas',
  'agents.registered-agents': 'Corretores Cadastrados',
  'agents.registry-agent': 'Cadastro - Corretor',
  'agents.photo-creci': 'Foto CRECI',
  'agents.photo-agent': 'Foto Corretor',
  'agents.link-agency': 'Vínculo Imobiliário',
  'agents.penalty-history': 'Histórico de penalidades',
  'agents.visit-history': 'Histórico de visitas',
  'agents.average-score': 'Pontuação média',
  'agents.agent': 'Corretor',
  'agents.agency': 'Imobiliária',
  'agents.assign': 'Vincular',
  'agents.deassign': 'Desvincular',
  'agents.pending': 'Pendente',
  'agents.cancel-assign': 'Cancelar pedido',
  'agents.deassign-uppercase': 'DESVINCULAR',

  /* 07.Plans */
  'plans.register-impulse-plans-and-features':
    'Cadastrar planos de impulsão e destaque',
  'plans.plan-name': 'Nome do Plano',
  'plans.plan-value': 'Valor do Plano',
  'plans.plan-duration': 'Duração do Plano',
  'plans.highlights': 'Destaques/Dia',
  'plans.impressions': 'Impressões/Dia',

  'plans.days': 'dias',
  'plans.register-plan': 'Cadastrar Plano',
  'plans.manage': 'Gerenciar Planos de impulsão e Destaque',
  'plans.edit-plan': 'Editar Plano',
  'plans.plan-type': 'Tipo de Plano',
  'plans.description': 'Descrição',
  'plans.value': 'Valor',
  'plans.number-of-impulses-per-day': 'Número de impulsões / dia',
  'plans.number-of-features-per-day': 'Número de destaques / dia',
  'plans.save-button': 'SALVAR',
  'plans.actual-plan': 'Seu plano atual:',
  'plans.dont-have': 'Você nao possui um plano ativo!',
  'plans.chose-plan':
    'Escolha um plano para ter acesso ao relatórios completos de seus corretores!',
  'plans.assign': 'ASSINAR',
  'plans.change': 'TROCAR',

  /* 08.Transactions */
  'transactions.transaction-agent': 'Transações - Corretores',
  'transactions.transaction-agency': 'Transações - Imobiliárias',
  'transactions.transaction-users': 'Transações - Usuários',

  /* 09.Users */
  'users.registred': 'Usuários cadastrados',
  'users.number-of-ads': 'Nº de Anúncios',
  'users.photo': 'Foto',
  'users.adverstiments': 'Anúncios do Usuário',
  'users.active': 'Ativo',
  'users.inactive': 'Inativo',
  'users.blocked': 'Bloqueado',

  /* 10.Subscriptions */
  'subs.register': 'Cadastrar Assinatura',
  'subs.manageAgent': 'Gerenciar Assinaturas - Corretores',
  'subs.manageAgency': 'Gerenciar Assinaturas - Imobiliárias',
  'subs.edit': 'Editar Assinatura',
  'subs.name': 'Nome da Assinatura',
  'subs.type': 'Tipo de Assinatura',
  'subs.value': 'Valor da Assinatura',
  'subs.ads_per_month': 'Anúncios por Mês',
  'subs.price': 'Valor da Assinatura',
  'subs.agents_linked': 'Corretores por Mês',
  'subs.payment': 'Pagar agora',
  'subs.card_number': 'Número do cartão',
  'subs.cardholder_name': 'Nome do titular',
  'subs.expiration_date': 'Validade',
  'subs.cnpj': 'CNPJ',
  'subs.cvv': 'CVV',
  'subs.pay': 'PAGAR',
  /* 11.Ratings */
  'rating.agent-rating-and-comment': 'Avaliações e comentários de corretores',
  'rating.agency-rating-and-comment': 'Avaliações e comentários de imóveis',
  'rating.select': 'Selecionar',
  'rating.all': 'Todas',
  'rating.this-page': 'Esta página',
  'rating.read': 'Lidas',
  'rating.single-read': 'Lido',
  'rating.not-read': 'Não lidas',
  'rating.mark': 'Marcar',
  'rating.as-read': 'Como lida',
  'rating.as-not-read': 'Como não lida',
  'rating.date': 'Data da avaliação',
  'rating.agent': 'Corretor avaliado',
  'rating.property': 'Imóvel avaliado',
  'rating.user': 'Usuário avaliado',
  'rating.user-email': 'E-mail do usuário',
  'rating.agent-rating': 'Avaliação do corretor',
  'rating.agency-rating': 'Avaliação do imóvel',
  'rating.user-rating': 'Avaliação do usuário',
  'rating.agent-creci': 'CRECI do corretor',
  'rating.coment': 'Comentário',
  'rating.evaluate': 'Avaliação',
  'rating.whos-evaluate': 'Quem Avaliou',
  'rating.visiting-this-property': 'Em visita a este imóvel',
  'rating.property-id': 'ID do imóvel',
  'rating.cordiality': 'Cordialidade',
  'rating.wasCordial': 'Corretor cordial',
  'rating.notCordial': 'Não foi cordial',
  'rating.punctuality': 'Pontualidade',
  'rating.wasPunctual': 'Corretor pontual',
  'rating.notPunctual': 'Não foi pontual',
  'rating.knowledge': 'Conhecimento sobre o imóvel',
  'rating.Knowledgeful': 'Conhece bem',
  'rating.knowledgeless': 'Não conhece bem',
  'rating.rate': 'Nota: ',

  /* 12.Issues */
  'issues.related-issues': 'Problemas relatados',
  'issues.report-name': 'Nome',
  'issues.report-email': 'Email',
  'issues.report-type-user': 'Tipo de usuário',
  'issues.report-type-issue': 'Tipo de problema',
  'issues.report-date': 'Data da visita',
  'issues.report-read': 'Lido',
  'issues.actions': 'Ações',
  'issues.in-visit': 'Em visita a este imóvel',
  'issues.info-advertiser': 'Informações do anunciante',
  'issues.info-agent': 'Informações do corretor desta visita',
  'issues.time': 'Horário',
  'issues.code': 'Cod',
  'issues.creci': 'CRECI',
  'issues.visitor-appear': 'Visitante compareceu?',
  'issues.success-log-in': 'Conseguiu entrar no imóvel?',
  'issues.message': 'Mensagem',
  'issues.report-problem': 'Problema relatado',
  'issues.back-button': 'Voltar',

  /* 13.Months */
  'month.january': 'Janeiro',
  'month.february': 'Fevereiro',
  'month.march': 'Março',
  'month.april': 'Abril',
  'month.may': 'Maio',
  'month.june': 'Junho',
  'month.july': 'Julho',
  'month.august': 'Agosto',
  'month.september': 'Setembro',
  'month.october': 'Outubro',
  'month.november': 'Novembro',
  'month.december': 'Dezembro',

  /* 14.Ads */
  'ad.ad': 'Anúncios',
  'ad.registered': 'Ativos',
  'ad.sold': 'Vendidos',
  'ad.disabled': 'Desativados',
  'ad.publish': 'PUBLICAR',
  'ad.id': 'ID',
  'ad.propertie': 'Imóvel',
  'ad.city': 'Cidade',
  'ad.uf': 'UF',
  'ad.plan': 'Plano de inpulsão/destaque',
  'ad.actions': 'Ações',
  'ad.floor': 'Andar',
  'ad.informations': 'Insira as informações do imóvel',
  'ad.roof': 'Cobertura',
  'ad.is_new': 'Imóvel novo?',
  'ad.entrance': 'Portaria',
  'ad.ad_type': 'Tipo de anúncio',
  'ad.type': 'Tipo de imóvel',
  'ad.usefullArea': 'Área útil',
  'ad.bedrooms': 'Dormitórios',
  'ad.suites': 'Suítes',
  'ad.bathrooms': 'Banheiros',
  'ad.garage': 'Vagas para carros',
  'ad.furnished': 'Mobiliado',
  'ad.keyType': 'Tipo de chave',
  'ad.animals': 'Aceita animais',
  'ad.occupied': 'Quem ocupa',
  'ad.advertiser': 'Anunciante é',
  'ad.cost': 'Custo do imóvel',
  'ad.condominium': 'Valor de condomínio',
  'ad.sellingPrice': 'Valor de venda do imóvel',
  'ad.iptu': 'Valor do IPTU do imóvel',
  'ad.sell': 'Venda',
  'ad.rent': 'Aluguel',
  'ad.features': 'Características e itens',
  'ad.building_features': 'Instalações do condomínio',
  'ad.home_appliances': 'Eletrodomésticos',
  'ad.home_appliances_info': 'Infome quais eletrodomésticos o imóvel possui.',
  'ad.description_info': 'Descrição e fotos do imóvel',
  'ad.description': 'Escreva uma breve descrição do imóvel',
  'ad.appliances': 'Escreva sobre os eletrodomésticos do imóvel',
  'ad.impulse': 'Impulsionar',
  'ad.deactivate': 'Desativar',
  'ad.activate': 'Reativar',
  'ad.selled': 'Vendido',
  'ad.not-selled': 'Não Vendido',
  'ad.edit': 'Editar',
  'ad.back': 'Voltar',
  'ad.disable-confirmation': 'Deseja desativar o anúncio?',
  'ad.enable-confirmation': 'Deseja ativar o anúncio?',
  'ad.save': 'Salvar',
  'ad.actual-plan': 'Plano de impulsão/destaque atual',
  'ad.plans': 'Escolha um plano para impulsionar este anúncio',
  'ad.accept-message': 'Deseja confirmar corretagem?',
  'ad.remove-message': 'Deseja negar corretagem?',
  'ad.info-sold': 'Venda informada',
  'ad.accept-sold-message': 'Deseja confirmar venda?',
  'ad.remove-sold-message': 'Deseja negar venda?',
  'ad.sell-info': 'Venda informada em:',

  /* 15.Imob Agents */
  'imob.agents-linked': 'Corretores vinculados',
  'imob.agents-search': 'Buscar corretores',
  'agency.select-agent': 'Selecione um corretor',

  /* 16.Dashboard */
  'dashboard.new-ads': 'Anúncios novos publicados',
  'dashboard.ad-views': 'Vizualizações de anúncios',
  'dashboard.new-users': 'Novos usuários cadastrados',
  'dashboard.new-agents': 'Novos corretores na plataforma este mês',
  'dashboard.agents-count': 'Corretores cadastrados até aqui',
  'dashboard.schedule-now-count': '"Visita Agora" acionados',
  'dashboard.schedulling': 'Agendamentos',
  'dashboard.schedules': 'Agendadas',
  'dashboard.done': 'Concluídas',
  'dashboard.cancelled': 'Canceladas',
  'dashboard.visit': 'Visitas',
  'dashboard.sales': 'Vendas',
  'dashboard.schedule-now': 'Visite Agora',
  'dashboard.final-users': 'Usuários finais por estado',
};
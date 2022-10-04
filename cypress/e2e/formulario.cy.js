import Formulario from '../support/pages/Formulario';

const dados = require('../fixtures/dados.json');

describe('Formulário Ticto', () => {
    beforeEach(() => {
        Formulario.acessarFormulario();
    });

    it('Confirmar carregamento da página', () => {
        cy.screenshot();
    });

    it('Preenchendo dados inválidos', () => {
        Formulario.preencherFormulario('Gabriel', 'nao@existe', 'Teste');

        Formulario.mensagemErroCampoNome();
        Formulario.mensagemErroCampoPassword();
    });

    it('Preenchendo dados válidos', () => {
        Formulario.preencherFormulario(dados.nome, dados.email, dados.password);

        Formulario.validarExistenciaNoFormulario(dados.nome);
    });

    it('Editar dados inválidos', () => {
        Formulario.editarUsuario(dados.email, 'ivalido', 'nao@existe');
    });

    it('Editar dados inválidos', () => {
        let nomeEditado = dados.nome + ' editado';
        let emailEditado = 'email@editado';

        Formulario.editarUsuario(dados.email, nomeEditado, emailEditado);

        Formulario.validarExistenciaNoFormulario(nomeEditado);
    });

    it('Escluir usuário', () => {
        Formulario.excluirUsuario(dados.email);
    });
});

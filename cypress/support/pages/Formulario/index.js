class Formulario {
    acessarFormulario() {
        cy.visit('https://qa-test.ticto.io/');
    }

    preencherFormulario(nome, email, password) {
        cy.get('#name').focus().type(nome);
        cy.get('#email').focus().type(email);
        cy.get('#password').focus().type(password);

        cy.contains('Cadastrar').click();
    }

    editarUsuario(emailJaExistente, nome, email) {
        cy.contains(emailJaExistente)
            .parent()
            .children('th')
            .invoke('text')
            .then(id => {
                console.log(id);
                cy.contains(emailJaExistente)
                    .parent()
                    .contains('Ações')
                    .click();
                cy.contains(emailJaExistente)
                    .parent()
                    .contains('Editar')
                    .click();
                cy.get('#e_name' + id)
                    .clear()
                    .type(nome);
                cy.get('#e_email' + id)
                    .clear()
                    .type(email);

                cy.get(
                    '#modalEdit' +
                        id +
                        ' > .modal-dialog > .modal-content > .modal-footer > .btn-primary'
                ).click({ force: true });
            });
    }

    excluirUsuario(emailJaExistente) {
        cy.contains(emailJaExistente).parent().contains('Ações').click();
        cy.contains(emailJaExistente).parent().contains('Excluir').click();

        cy.contains('Deseja realmente excluir?')
            .parent()
            .parent()
            .contains('Excluir')
            .click({ force: true });
    }

    validarExistenciaNoFormulario(dado) {
        cy.get('table > tbody > tr').children().should('contain.text', dado);
    }

    mensagemErroCampoNome() {
        cy.contains('Insira um Nome e Sobrenome válido.').should('be.visible');
    }

    mensagemErroCampoPassword() {
        cy.contains('O campo Password deve ter no minimo 8 caracteres.').should(
            'be.visible'
        );
    }
}

export default new Formulario();

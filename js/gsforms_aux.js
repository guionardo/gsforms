function testLayout() {
    var j = {
        form: {
            id: "Identificador",
            description: "Nome do form",
            version: "1.0",
            note: "Notas/observações\nMais de uma linha de texto"
        },
        fields: [
            {
                name: "campoString",
                description: "Campo String",
                tooltip: "Campo string",
                type: "string",
                datasource: "Origem",
                required: true,
                defaultvalue: ""
            }, {
                name: "campoInt",
                description: "Campo Inteiro",
                tooltip: "Campo numérico inteiro",
                type: "int",
                datasource: "Origem",
                required: false,
                defaultvalue: 10
            }, {
                name: "campoBool",
                description: "Campo booleano",
                tooltip: "Sim ou não?",
                type: "boolean",
                datasource: "",
                required: true,
                defaultvalue: true
            }, {
                name: "campoSelect",
                description: "Campo Select",
                type: "string",
                datasource: ["Opção 1", "Opção 2", "Terceira opção"],
                defaultvalue: "Opção 2"
            }
        ]
    };
    return j;
}
//# sourceMappingURL=gsforms_aux.js.map
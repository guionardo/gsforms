class GSForms {
    private static addNode(parentNode, elementName = "div", nodeClass = ""): HTMLElement {
        var node = document.createElement(elementName);
        parentNode.appendChild(node);
        if (nodeClass)
            node.className = nodeClass;
        return node;
    }

    // Validar datasource
    // Deve retornar um array
    // ["Opção 1","Opção 2","Opção 3"]
    // [{chave1="Opção 1",chave2="Opção 2"}]
    public static validateDatasource(datasource): object {
        if (!Array.isArray(datasource)) {
            return null;
        }
        for(var e in datasource){
//
        }

    }

    public static testLayout() {
        var j = {
            form: {
                id: "Identificador",
                description: "Nome do form",
                version: "Versão do form",
                note: "Notas/observações"
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

    public static validate(formId): boolean {
        var form = document.getElementById(formId);
        if (form == null) {
            return false;
        }
        return true;
    }

    public static parseForm(idContainer, formJson) {
        console.log("parseForm(" + idContainer + ")");
        var container = document.getElementById(idContainer);
        if (container == null) {
            console.error("parseForm: Container " + idContainer + " inexistente");
            return;
        }
        // Definir o container
        container.className = container.className.replace("gsf_container", "") + " gsf_container";
        container.innerText = "";

        // Header
        console.log("-->Header")
        this.addNode(container, "div").innerHTML = formJson.form.description;

        // Body
        console.log("-->Body")
        var nodeBody = this.addNode(container, "div");
        for (var field in formJson.fields) {
            var f = formJson.fields[field];
            console.log('--->' + f.name);
            var nodeField = this.addNode(nodeBody, "div");
            var nodeLabel = this.addNode(nodeField, "label");
            nodeLabel.innerHTML = f.description;
            if (f.tooltip) {
                nodeLabel.title = f.tooltip;
            }

            var fieldTag = "";
            var fieldType = "input";
            var fieldDataSource = f.datasource;
            if (fieldDataSource) {
                if (Array.isArray(fieldDataSource)) {
                    f.type = "select";
                }
            }
            switch (f.type) {
                case "string":
                    fieldTag = "input";
                    break;
                case "password":
                    fieldTag = "input";
                    break;
                case "int":
                    fieldTag = "input";
                    fieldType = "number";
                    break;
                case "boolean":
                    fieldTag = "input";
                    fieldType = "checkbox";
                    break;

            }
            console.log('--->' + fieldTag + ' ' + fieldType);
            if (fieldTag) {
                var ft = this.addNode(nodeField, fieldTag);
                ft.name = f.name;
                ft.type = fieldType;

                if (f.tooltip) {
                    ft.title = f.tooltip;
                }
                if (f.required) {
                    ft.required = true;
                }

            }
        }


        // Footer
        console.log("-->Footer")
        this.addNode(container, "div").innerHTML = formJson.form.note ? formJson.form.note : "";

        // Botões
        console.log("-->Botões")
        var nodeBotoes = this.addNode(container, "div");
        var bOK = this.addNode(nodeBotoes, "button");
        bOK.innerHTML = "OK";
        var bCancel = this.addNode(nodeBotoes, "button");
        bCancel.innerHTML = "Cancelar";

    }

}
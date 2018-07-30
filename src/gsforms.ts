interface GSFormsDefs {
    form: GSFormDef;
    fields: GSFormFieldDefs;
}

interface GSFormDef {
    id: string, description: string, version?: string, note?: string
}

interface GSFormFieldDefs {
    [index: number]: {
        name: string,
        description: string,
        tooltip?: string,
        type: string,
        datasource: object,
        required?: boolean,
        defaultvalue?: object
    }
}
interface GSFormI18 {
    btnOk: string,
    btnCancel: string,
    lblVersion: string,
    cssNotReferenced: string
}
class GSForms {
    private static CSSSource: string = "https://raw.githubusercontent.com/guionardo/gsforms/master/css/gsforms.css";
    public static Logging: boolean = true;
    private static i18: string = "zz";
    private static i18strings: GSFormI18;
    private static CSSOK: boolean = false;

    public static seti18(lang: string) {
        if (lang == this.i18)
            return;
        switch (lang) {
            case "br":
                this.i18strings = { btnOk: "OK", btnCancel: "Cancelar", lblVersion: "Versão", cssNotReferenced: "não referenciado" };
                this.i18 = 'br';
                break;
            case "us":
                this.i18strings = { btnOk: "OK", btnCancel: "Cancel", lblVersion: "Version", cssNotReferenced: "not referenced" };
                this.i18 = 'us';
                break;
            default:
                this.i18strings = { btnOk: "btnOk", btnCancel: "btnCancel", lblVersion: "lblVersion", cssNotReferenced: "cssNotReferenced" };
                this.i18 = 'zz';
                break;
        }
    }

    private static Log(msg: string, error: boolean = false) {
        if (error) {
            console.error(msg);
        } else if (this.Logging)
            console.log(msg);
    }

    private static addNode(parentNode: HTMLElement, elementName = "div", nodeClass = ""): HTMLElement {
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
    public static validateDatasource(datasource: object): object {
        if (!Array.isArray(datasource)) {
            return null;
        }
        let tipo = typeof null;
        let errotipo = false;
        let opcoes = [];
        for (var e in datasource) {
            let elm = { id: "", value: false };
            if (tipo == typeof null) {
                tipo = typeof (datasource[e]);
            } else if (tipo != typeof (datasource[e])) {
                errotipo = true;
            }
            if (errotipo) {
                this.Log("validateDatasource -> ERRO NO PADRÃO", true);
                return null;
            }
            if (tipo == "object") {
                elm.id = Object.getOwnPropertyNames(datasource[e])[0];
                elm.value = datasource[e][elm.id];
            } else {
                elm.value = datasource[e];
            }
            opcoes.push(elm);
        }
        return opcoes;
    }

    public static validate(formId: string): boolean {
        var form = document.getElementById(formId);
        if (form == null) {
            return false;
        }
        return true;
    }

    public static parseForm(idContainer: string, formJson: GSFormsDefs) {
        this.installCSS();
        this.Log("parseForm(" + idContainer + ")");
        var container = document.getElementById(idContainer);
        if (container == null) {
            this.Log("parseForm: Container " + idContainer + " inexistente", true);
            return;
        }
        // Definir o container
        container.className = container.className.replace("gsf_container", "") + " gsf_container";
        container.innerText = "";

        // Header
        this.Log("-->Header")
        this.addNode(container, "div").innerHTML = formJson.form.description;

        // Body
        this.Log("-->Body")
        var nodeBody = this.addNode(container, "div");
        for (var field in formJson.fields) {
            var f = formJson.fields[field];
            this.Log('--->' + f.name);
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
            this.Log('--->' + fieldTag + ' ' + fieldType);
            if (fieldTag) {
                var ft = <HTMLInputElement>this.addNode(nodeField, fieldTag);
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
        let foot = '<span>' + (formJson.form.note ? formJson.form.note : '') + '</span>' +
            '<span style="float:right;">' + (formJson.form.version ? (this.i18strings.lblVersion + " " + formJson.form.version) : '') + '</span>';
        this.Log("-->Footer =  " + foot)
        this.addNode(container, "div").innerHTML = foot.replace("\n", "<br\>");

        // Botões        
        this.Log("-->Botões")
        var nodeBotoes = this.addNode(container, "div");
        var bOK = <HTMLButtonElement>this.addNode(nodeBotoes, "button");
        bOK.innerHTML = this.i18strings.btnOk;
        bOK.onclick = this.btnOkClick;

        var bCancel = <HTMLButtonElement>this.addNode(nodeBotoes, "button");
        bCancel.innerHTML = this.i18strings.btnCancel;
        bCancel.onclick = this.btnCancelClick;

    }

    public static installCSS() {
        if (this.CSSOK)
            return true;

        for (var i = 0; i < document.styleSheets.length; i++) {
            if (document.styleSheets[0].href.endsWith("gsforms.css")) {
                this.CSSOK = true;
                return true;
            }
        }
        this.Log("gsforms.css " + this.i18strings.cssNotReferenced, true);
        return false;
    }

    public static btnOkClick(this: HTMLElement, ev: MouseEvent): any {
        GSForms.Log("OK CLICKED");
    }
    public static btnCancelClick(this: HTMLElement, ev: MouseEvent): any {
        GSForms.Log("CANCEL CLICKED");
    }

    public static Init() {
        this.seti18("br");
    }

}

GSForms.Init();
// Base a ser utilizada
const alunosDaEscola=[{nome:"Henrique",notas:[],cursos:[],faltas:5},{nome:"Edson",notas:[],cursos:[],faltas:2},{nome:"Bruno",notas:[10,9.8,9.6],cursos:[],faltas:0},{nome:"Guilherme",notas:[10,9.8,9.6],cursos:[{nomeDoCurso:"Full Stack",dataMatricula:new Date}],faltas:0},{nome:"Carlos",notas:[],cursos:[],faltas:0},{nome:"Lucca",notas:[10,9.8,9.6],cursos:[{nomeDoCurso:"UX",dataMatricula:new Date}],faltas:0}];

// implementação

const TITULO = "\n*******  DH Fullstack - Desafio Javascript I  *******"
const TEMA = "*******            Sistema escolar            *******\n"


console.log(TITULO.toUpperCase());
console.log(TEMA.toUpperCase());


function adicionarAluno(nome){

/*Essa função irá receber uma *string* que é nome do aluno a ser criado. 
E seguindo o modelo de aluno, o mesmo deverá ser inserido na lista de alunos.
A função deve devolver um feedback de sucesso, caso o aluno seja inserido corretamente.*/

    let registroAluno = buscarAluno(nome);

    let aluno = {nome: nome, notas: [], cursos: [], faltas: 0}
    
    if(typeof(nome) == "string" && nome != "" && typeof(registroAluno) != "object"){
        alunosDaEscola.push(aluno);
        console.log("Aluno \"" + nome + "\" cadastrado com sucesso!");
        return true;
    } else {
        console.log("Erro ao cadastrar o aluno!");
        if(typeof(registroAluno) == "object"){
            console.log("Aluno " + nome + " já cadastrado!");
        } else {
            console.log("Esperado string não vazia!")
        }
        return false;
    }
}

function listarAlunos(){
/*Com essa função o usuário poderá ver todos os alunos cadastrados atualmente no sistema. 
Vale dizer que As informações deverão ser exibidas em um formato amigável.*/

    console.log("-----------------------------------------------------")
    console.log("\nAlunos cadastrados no sistema:\n")

    alunosDaEscola.forEach(aluno => {
        
        console.log("Nome:", aluno.nome);
        
        if (aluno.cursos.length) {
            aluno.cursos.forEach(curso => {
                diaMatricula = curso.dataMatricula.getDate();
                mesMatricula = curso.dataMatricula.getMonth() + 1;
                anoMatricula = curso.dataMatricula.getFullYear()
                dataMatricula = diaMatricula + "/" + mesMatricula + "/" + anoMatricula;
                console.log("Curso:", curso.nomeDoCurso, "- Matrículado em:", dataMatricula);
                
                let notas = '';
                aluno.notas.forEach(nota => notas ? notas = notas + " | " + nota : notas = nota); 
                console.log("Notas:", notas);
                console.log("Faltas:", aluno.faltas);
            })
        } else {
            console.log("Aluno não matriculado.");
        }

        
        console.log();
    })

    console.log("-----------------------------------------------------")
}

function buscarAluno(nome){
/* Por meio dessa função, podemos pesquisar um aluno por nome na lista de aluno. Ela deverá exibir um feedback, tanto para quando encontrar o aluno, tanto quando não encontrar. E deverá devolver um aluno em seu retorno. */
    let busca = alunosDaEscola.filter(aluno => aluno.nome == nome);

    if(busca.length){
        return busca.pop();
    } else {
        return "Aluno \"" + nome + "\" não cadastrado!";
    }

}

function matricularAluno(aluno, curso){
/* Essa funcionalidade irá permitir, cadastrar um aluno em um curso. 
Essa função só poderá ser executada em um aluno já devidamente cadastrado no sistema, e deverá armazenar a data atual no momento da matricula
Lembre-se de exibir o feedback para o usuário. */

    let registroAluno = buscarAluno(aluno.nome);

    let indiceAluno = alunosDaEscola.indexOf(registroAluno);

    var data = new Date();

    if (indiceAluno == -1){
        console.log("Não é possível matricular. Aluno não cadastrado!");
        return false;
    } else {
        alunosDaEscola[indiceAluno].cursos.push({nomeDoCurso:curso, dataMatricula:data});
        console.log("Aluno \"" + aluno.nome + "\" matriculado com sucesso!");
        return true;
    }

}

function aplicarFalta(aluno){
/*
Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá incrementar uma falta ao aluno. Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar falta em aluno se o mesmo tiver matriculado em um curso.
*/
    let registroAluno = buscarAluno(aluno.nome);

    let indiceAluno = alunosDaEscola.indexOf(registroAluno);

    if (indiceAluno == -1){
        console.log("Não é possível aplicar falta. Aluno não cadastrado!");
        return false;
    } else {
        if(alunosDaEscola[indiceAluno].cursos.length){
            faltas = alunosDaEscola[indiceAluno].faltas;
            faltas++;
            alunosDaEscola[indiceAluno].faltas = faltas;        
            console.log("Aplicada falta ao aluno " + aluno.nome);
            return true;
        } else {
            console.log("Não é possível aplicar falta. Aluno não matriculado!");
            return false;
        }
    }

}

function aplicarNota(aluno, nota){
/*
Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá adicionar uma nota ao aluno na sua lista de notas. Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar nota em aluno se o mesmo tiver matriculado em um curso.
*/

    let registroAluno = buscarAluno(aluno.nome);

    let indiceAluno = alunosDaEscola.indexOf(registroAluno);

    if (indiceAluno == -1){
        console.log("Não é possível aplicar nota. Aluno não cadastrado!");
        return false; 
    } else {
        if(alunosDaEscola[indiceAluno].cursos.length){
            alunosDaEscola[indiceAluno].notas.push(nota);
            console.log("Aplicada nota " + nota + " ao aluno \"" + aluno.nome + "\"");
            return true;
        } else {
            console.log("Não é possível aplicar nota. Aluno não matriculado!");
            return false;
        }
    }
}

function aprovarAluno(aluno){
/* 
Ao receber um aluno devidamente cadastrado em nossa lista, deverá dizer se o mesmo está aprovado ou não. Os critérios de aprovação são: ter no máximo 3 faltas e média 7 em notas.
Só o aluno só poderá ser aprovado se o mesmo tiver matriculado em um curso.
*/

    let registroAluno = buscarAluno(aluno.nome);

    let indiceAluno = alunosDaEscola.indexOf(registroAluno);

    if (indiceAluno == -1){
        console.log("Não é possível aprovar. Aluno não cadastrado!");
        return false;
    } else {
        if(alunosDaEscola[indiceAluno].cursos.length){
            
            let notas = 0;
            alunosDaEscola[indiceAluno].notas.forEach(nota => notas += nota )
            let media = notas / alunosDaEscola[indiceAluno].notas.length;
            let faltas = alunosDaEscola[indiceAluno].faltas;

            if(faltas < 3 && media >= 7){
                console.log("Aluno Aprovado!");
            } else {
                console.log("Aluno Reprovado!");
            }
            
            return true;

        } else {
            console.log("Não é possível aprovar. Aluno não matriculado!");
            return false;
        }
    }
}
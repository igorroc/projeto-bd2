create table Pessoa (
    matricula varchar(10) primary key,
    nome varchar(50) NOT NULL,
    endereco varchar(100) NOT NULL,
    data_nascimento date NOT NULL
);

create table Aluno (
    id integer primary key auto_increment,
    curso varchar(50) NOT NULL,
    matricula varchar(10) NOT NULL
);

create table Professor (
    id integer primary key auto_increment,
    formacao varchar(100) NOT NULL,
    matricula varchar(10) NOT NULL,
    salario float NOT NULL
);

alter table
    Aluno
add
    constraint fk_aluno_pessoa foreign key (matricula) references Pessoa(matricula);

alter table
    Professor
add
    constraint fk_professor_pessoa foreign key (matricula) references Pessoa(matricula);
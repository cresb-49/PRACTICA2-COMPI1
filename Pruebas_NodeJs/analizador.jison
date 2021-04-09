/*Ejemplo basico del manejo de Jison en NodeJs
    compilar con: jison basico.jison 
    ejecutar con: node basico.js entrada

    o ejecutar el bash.
    npm init -y : para iniciar un proyecto nodejs
*/

/* Definición Léxica */
%lex

/*Opciones de configuracion del analizador lexico jison
 Por ejemplo que sea insensible de mayusculas y minusculas */
//%options case-insensitive 

/*separador de area*/
%% 

[ \r\t\n]                                   { /*ignorar*/}
([/][*][*][^]*[*][/])                       //comentario de bloque

(Terminal)                                  return 'TERMINAL'
(Lex)                                       return 'LEX'
(Syntax)                                    return 'SYN'
((Wison)("¿"))                              return 'WISON_INI'
(("?")(Wison))                              return 'WISON_END'
(("{")("{")(":"))                           return 'INI_SYN'
((":")("}")("}"))                           return 'END_SYN'
([{][:])                                    return 'INI_LEX'
([:][}])                                    return 'END_LEX'
([;])                                       return 'PUNTO_COMA'
(No_Terminal)                               return 'NO_TERMINAL'
(Initial_Sim)                               return 'INITIAL_SYM'
("|")                                       return 'OR'
("(")                                       return 'PA_A'
(")")                                       return 'PA_C'
([<][=])                                    return 'PRODUCTION'
([<][-])                                    return 'ASIGN_RE'
([$][_][a-zA-Z]+([a-zA-Z]|[_]|[0-9])*)      return 'STATE_TERMINAL'
([%][_][a-zA-Z]+([a-zA-Z]|[_]|[0-9])*)      return 'STATE_NO_TERMINAL'
([*])                                       return 'KLEE'
([+])                                       return 'C_POSI'
([?])                                       return 'C_ANS'
(("'")([^])+("'"))                          return 'SINGLE_EXP'
(("[")("aA-zZ")("]"))                       return 'ANY_LE'
(("[")("0-9")("]"))                         return 'ANY_NUM'
(([a][A][-][z][Z])|([0][-][9]))             return 'SEC_ES'
([#][^]*[\n])                               //Comentario de una sola linea



/* Las últimas dos expresiones son para reconocer el fin de la entrada
 y caracteres no válidos.*/
<<EOF>>                 return 'EOF'
.                       return 'INVALID'


/* Fin de la Definición Léxica */
/lex

/* Asociación de operadores y precedencia si fuera necesario */

/*Definicion del simbolo inicial*/

%start ini

%{
	//Codigo Javascript Incrustado
%}

//separador de area
%% 

ini     : estructura EOF
        ;

estructura      : WISON_INI expresiones expresionesP WISON_END
                | error
                {
                        console.log('Error contenedor Wison: \"' + yytext +
                        '\" Linea: ' + (this._$.first_line) +
                        ' Columna: ' + (this._$.first_column+1));
                }
                ;

expresiones     : LEX INI_LEX contLex END_LEX
                | error
                {
                        console.log('Error en definicion de Estrucutra Lexica: \"' + yytext +
                        '\" Linea: ' + (this._$.first_line) +
                        ' Columna: ' + (this._$.first_column+1));
                }
                ;
contLex : TERMINAL STATE_TERMINAL ASIGN_RE expReg PUNTO_COMA contLexP
        | error
        {
                console.log('Error en definicion de simbolo terminal: \"' + yytext +
                '\" Linea: ' + (this._$.first_line) +
                ' Columna: ' + (this._$.first_column+1));
        }
        ;

contLexP        : contLex
                |
                ;


expReg  : SINGLE_EXP
        | concat
        | clauseMod
        | error
        {
                console.log('Error de exprecion regular: \"' + yytext +
                '\" Linea: ' + (this._$.first_line) +
                ' Columna: ' + (this._$.first_column+1));
        }
        ;

concat  : PA_A exp PA_C concat
        |
        ;

exp     : STATE_TERMINAL clause
        | ANY_NUM clause
        | ANY_LE clause
        | error
        {
                console.log('Error en agrupacion de exprecion: \"' + yytext +
                '\" Linea: ' + (this._$.first_line) +
                ' Columna: ' + (this._$.first_column+1));
        }
        ;

clauseMod       : ANY_NUM clause
                | ANY_LE clause
                ;

clause  : KLEE
        | C_POSI
        | C_ANS
        |
        | error
        {
                console.log('Error de clausula: \"' + yytext +
                '\" Linea: ' + (this._$.first_line) +
                ' Columna: ' + (this._$.first_column+1));
        }
        ;


expresionesP    : SYN INI_SYN contSyn END_SYN
                | error
                {
                        console.log('Error en definicion de Estrucutra Sintactica: \"' + yytext +
                        '\" Linea: ' + (this._$.first_line) +
                        ' Columna: ' + (this._$.first_column+1));
                }
                ;

contSyn : declaPro initState producciones
        | error
        ;

declaPro        : NO_TERMINAL STATE_NO_TERMINAL PUNTO_COMA declaPro
                |
                ;

initState       : INITIAL_SYM STATE_NO_TERMINAL PUNTO_COMA
                ;

producciones    : STATE_NO_TERMINAL PRODUCTION
                |
                ;

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
/* Espacios en blanco */
[ \r\t\n]           { /*ignorar*/}

/*Apartado de deficion de expresiones regulares y tokens  de retorno*/

//Palabra recervada Terminal
(Terminal)              return 'TERMINAL'
(Lex)                   return 'LEX'
(Wison)                 return 'WISON'
([{][:])                return 'INIT_LEX'
([:][}])                return 'END_LEX'
([#][^]*[\n])           return 'COMENTARIO'


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

ini : expresion 
;

expresiones : comentarios
	        | wisonEs
	        | error 
            ;

comentarios :   expresion
            |   COMENTARIO
            ;

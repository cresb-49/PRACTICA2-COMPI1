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
(Terminal)                                  return 'TERMINAL'
(Lex)                                       return 'LEX'
(Syntax)                                    return 'SYN'
(Wison[¿])                                  return 'WISON_INI'
([?]Wison)                                  return 'WISON_END'
([{][:])                                    return 'INI_LEX'
([:][}])                                    return 'END_LEX'
([;])                                         return 'PUNTO_COMA'
([{][{][:])                                 return 'INI_SYN'
([:][}][}])                                 return 'END_SYN'
(No_Terminal)                               return 'NO_TERMINAL'
(Initial_Sim)                               return 'INI_SYM'
(<=)                                        return 'PRODUCTION'
(<-)                                        return 'ASIGN_RE'
([$][_][a-zA-Z]+([a-zA-Z]|[_]|[0-9])*)      return 'STATE_TERMINAL'
([*])                                       return 'KLEE'
([+])                                       return 'C_POSI'
([?])                                       return 'C_ANS'
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

%% 

ini : expresion EOF
    ;

expresion   :   LEX;

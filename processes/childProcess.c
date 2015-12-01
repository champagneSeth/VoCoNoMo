#include <stdio.h>

int main(int argc, char *argv[] ){

	 int i = 0;
   	 char c;
   
   while(argv[1][i])
   {
      putchar(toupper(argv[1][i]));
      i++;
   }
   
   printf("\n%s",argv[1]);

}
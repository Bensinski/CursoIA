import numpy as np
def multi_matrices(A, B):
    if A.shape[1] != B.shape[0]:
        return None
    
    filas_A, columnas_A = A.shape
    filas_B, columnas_B = B.shape
    resultado = np.zeros((filas_A, columnas_B))  
    
    for i in range(filas_A):
        for j in range(columnas_B):
            for k in range(columnas_A):
                resultado[i][j] += A[i][k] * B[k][j]
    
    return resultado

print("A x B")
fa=int(input("Ingrese filas de matriz A: "))
ca=int(input("Ingrese columnas de matriz A: "))
fb=int(input("Ingrese filas de matriz B: "))
cb=int(input("Ingrese columnas de matriz B: "))

A = np.zeros((fa, ca))
print("Matriz A:\n")
for i in range(fa):
    for j in range(ca):
        A[i][j] = float(input(f"Elemento [{i+1},{j+1}]: "))


B = np.zeros((fb, cb))
print("Matriz B: \n")
for i in range(fb):
    for j in range(cb):
        B[i][j] = float(input(f"Elemento [{i+1},{j+1}]: "))


print("\nMatriz A:")
print(A)
print("\nx")
print("\nMatriz B:")
print(B)
resultado = multi_matrices(A, B)

print("\nMatriz C:")
if resultado is None:
    print("No se pueden multiplicar las matrices")
    print(f"Las columnas de la primera matriz ({ca}) deben ser iguales a las filas de la segunda ({fb}).")
else:
    print(resultado)

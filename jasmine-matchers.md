# toBe Matcher : sert à comparer les variables .. équivalent à ===
expect().toBe()
expect().not.toBe()

# toEqual matcher: sert à comparer les variables et les objets.
expect().toEqual()

# toMatch : matcher pour les expressions regulières.
expect().toMatch()
expect().not.toMatch()

# toBeDefined : camparer avec undefined, afin de returner si la variable ou l'objet est defini
expect().toBeDefined()

# toBeUndefined : camparer avec undefined, afin de returner si la variable ou l'objet est non defini
expect().toBeUndefined()

# toBeNull : determiner si c'est null
expect().toBeNull()

# toBeTruthy : 
# toBeFalsy

# toContain : determiner si un objet exite dans une liste
expect().toContain()

# toBeGreaterThan / toBeCloserTo / toBeLessThan : des comparaisons mathématiques

# toThrow : matcher pour tester si une methode ou une fonction declanche une exception 
expect().toThrow();

#toThrowError : matcher pour tester si une methode declanche une exception spécifique.
expect().toThrowError(TypeError, "....");

# beforeEach / afterEach / beforeAll / afterAll

# xit , un test en pending ( en attente ou ignoré) 


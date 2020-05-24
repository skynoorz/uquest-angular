INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at) VALUES ('9086429','Guarachi', 'Enriquez','Ronald Alcides','1995-03-18','Masculino','aligatorbol@gmail.com','ron', '$2a$10$VduQcHg/HcN6VGtAYArRE.ejx1IKGMPoNAz/nwxGdJhwbu0O4C2ta', 1, '2020-05-23')
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at) VALUES ('8451251','Doe', 'Doe','Juan','1993-02-10','Masculino','juan@doe.com', 'admin1', '$2a$10$6Dx5b/u3.WsCsdg.eRIJze38pR9qU6mzmWSB0PN.LnnOUTZgyFhx2', 1, '2020-05-23')
INSERT INTO categorias (id, nombre, descripcion) VALUES (1,"Elecciones","Temporadas para las elecciones electorales dentro la UMSA");
INSERT INTO categorias (id, nombre, descripcion) VALUES (2,"Materias","Respecto a materias que se cursan");
INSERT INTO encuestas (id,titulo, tipo, create_at, fecha_ini, fecha_fin, categoria_id, usuario_id) VALUES (1, 'Discriminacion de los estudios', 'abierto', '2019-08-28 8:30', '2019-08-28 8:30', '2019-08-30 10:30', 1, 1);
INSERT INTO preguntas (id, descripcion, create_at, tipo, encuesta_id) VALUES (1, '¿Las personas con discapacidad son mas propensas a estudiar?','2019-08-28 8:30','seleccion',1);
INSERT INTO preguntas (id, descripcion, create_at, tipo, encuesta_id) VALUES (2, '¿Dependiendo la Discapacidad?','2020-01-01 8:30','escala',1);
INSERT INTO opciones (id, texto, tipo) VALUES (1, 'SI', 1);
INSERT INTO opciones (id, texto, tipo) VALUES (2, 'NO', 1);
INSERT INTO preguntas_opciones (pregunta_id, opcion_id) VALUES (1,1);
INSERT INTO preguntas_opciones (pregunta_id, opcion_id) VALUES (2,2);
INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (1, "Informatica", "Av. Villazon NRO 1995 Monoblock Central, segundo patio, edif. carrera de Informatica","2440338","informatica@informatica.edu.bo")
INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (2, "Fisica", "Calle 27 Cota-Cota, Campus Universitario","2440338","fisica@fiumsa.edu.bo")
INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (3, "Biologia", "Calle 27 Cota-Cota, Campus Universitario","2799459","")
INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (4, "Ciencias Quimicas", "Calle 27 Cota-Cota, Campus Universitario","2792238","quimicavirtual.fcpn@gmail.com")
INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (5, "Matematica", "Av. Villazon NRO 1995 Monoblock Central, Edificio Antiguo","2441578","")
INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (6, "Estadistica", "Av. Villazon NRO 1995 Monoblock Central, Edificio Antiguo","2442100","estadistica@umsa.bo")
INSERT INTO institutos (id, nombre, sigla, fono, email, carrera_id) VALUES (1,"Instituto de Investigaciones de Informatica", "III", "2440338","informatica@informatica.edu.bo", 1)
INSERT INTO institutos (id, nombre, sigla, fono, email, carrera_id) VALUES (2,"Instituto de Investigación Matemática", "IIMAT", "2441578","", 5)
INSERT INTO institutos (id, nombre, sigla, fono, email, carrera_id) VALUES (3,"Instituto de Investigaciones Químicas", "IIQ", "279-5878 ","iq_umsa@gmail.com", 4)
INSERT INTO usuarios_institutos (instituto_id, usuario_id) VALUES (1,1)
INSERT INTO usuarios_carreras (carrera_id, usuario_id) VALUES (1,1)
INSERT INTO usuarios_carreras (carrera_id, usuario_id) VALUES (2,2)
INSERT INTO dispositivos (id, so, ip, mac) VALUES (1, 'Linux', '172.45.14.154', '74-40-BB-B8-5A-47')
INSERT INTO dispositivos (id, so, ip, mac) VALUES (2, 'Windows', '172.32.143.84', '0A-00-27-00-00-2B')
INSERT INTO dispositivos_encuestas (encuesta_id, dispositivo_id) VALUES (1, 1)
INSERT INTO dispositivos_encuestas (encuesta_id, dispositivo_id) VALUES (1, 2)

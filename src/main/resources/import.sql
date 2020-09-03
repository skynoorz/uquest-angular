INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (1, 'Informatica', 'Av. Villazon NRO 1995 Monoblock Central, segundo patio, edif. carrera de Informatica','2440338','informatica@informatica.edu.bo')
INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (2, 'Fisica', 'Calle 27 Cota-Cota, Campus Universitario','2440338','fisica@fiumsa.edu.bo')
INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (3, 'Biologia', 'Calle 27 Cota-Cota, Campus Universitario','2799459','')
INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (4, 'Ciencias Quimicas', 'Calle 27 Cota-Cota, Campus Universitario','2792238','quimicavirtual.fcpn@gmail.com')
INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (5, 'Matematica', 'Av. Villazon NRO 1995 Monoblock Central, Edificio Antiguo','2441578','')
INSERT INTO carreras (id, nombre, direccion, fono, email) VALUES (6, 'Estadistica', 'Av. Villazon NRO 1995 Monoblock Central, Edificio Antiguo','2442100','estadistica@umsa.bo')
INSERT INTO institutos (id, nombre, sigla, fono, email, carrera_id) VALUES (1,'Instituto de Investigaciones de Informatica', 'III', '2440338','informatica@informatica.edu.bo', 1)
INSERT INTO institutos (id, nombre, sigla, fono, email, carrera_id) VALUES (2,'Instituto de Investigación Matemática', 'IIMAT', '2441578','', 5)
INSERT INTO institutos (id, nombre, sigla, fono, email, carrera_id) VALUES (3,'Instituto de Investigaciones Químicas', 'IIQ', '279-5878 ','iq_umsa@gmail.com', 4)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id, instituto_id) VALUES ('9086429','Guarachi', 'Enriquez','Ronald Alcides','1995-03-18','Masculino','aligatorbol@gmail.com','ron', '$2a$10$qpsP549oRJqiswHqAmfzCO6Tyc71DLp9c7FOEK01m25Xx.c5W3m9a', 1, '2020-05-25', 1, 1)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id, instituto_id) VALUES ('8451251','Doe', 'Doe','Juan','1993-02-10','Masculino','juan_doe@gmail.com', 'admin', '$2a$10$GGcI8UT1oyjkjW1LntFb7uIlh5OwrCQC6QTXcjX30RSu1y1ZtQCiS', 1, '2020-05-25',5, 2)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id, instituto_id) VALUES ('5464345','Fernandez', 'Arguedas','Maria','1990-01-15','Femenino','fernandez_maria@gmail.com', 'fema', 'fema', 1, '2020-05-25',4, 3)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('10535687','Helguero', 'Almanza','Roberto','1995-12-30','Masculino','helguero_roberto@gmail.com', 'hero', 'hero', 1, '2020-05-25',4)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('8623456','Garcia', 'Almendra','Simon','1999-01-25','Masculino','garcia_simon@hotmail.com', 'gaal', 'gaal', 1, '2020-05-25',5)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('9352652','Gomez', 'Amestoy','Jaime','1991-09-24','Masculino','gomez_jaime@gmail.com', 'goja', 'goja', 1, '2020-05-25',6)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('5689782','Jimenez', 'Bernan','Ximena','1992-07-08','Femenino','jimenez_ximena@outlook.com', 'jixi', 'jixi', 1, '2020-05-25',1)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('15389672','Loza', 'Benavidez','Rosalia','2000-02-13','Masculino','loza_rosalia@yahoo.com', 'loro', 'loro', 1, '2020-05-25',2)
INSERT INTO categorias (id, nombre, descripcion) VALUES (1,'Elecciones','Temporadas para las elecciones electorales dentro la UMSA');
INSERT INTO categorias (id, nombre, descripcion) VALUES (2,'Materias','Respecto a materias que se cursan');
INSERT INTO encuestas (id,titulo, tipo, create_at, fecha_ini, fecha_fin, categoria_id, usuario_id) VALUES (1, 'Discriminacion de los estudios', 'abierto', '2019-08-28', '2019-08-28', '2019-08-30', 1, 1);
INSERT INTO preguntas (id, descripcion, create_at, tipo, encuesta_id) VALUES (1, '¿Las persona con discapacidad son mas propensas a estudiar?','2019-08-28','Opcion Multiple',1);
INSERT INTO preguntas (id, descripcion, create_at, tipo, encuesta_id) VALUES (2, '¿Dependiendo la Discapacidad?','2020-01-01','Opcion Multiple',1);
INSERT INTO opciones (id, texto, tipo) VALUES (1, 'SI', 1);
INSERT INTO opciones (id, texto, tipo) VALUES (2, 'NO', 1);
INSERT INTO preguntas_opciones (pregunta_id, opcion_id) VALUES (1,1);
INSERT INTO preguntas_opciones (pregunta_id, opcion_id) VALUES (1,2);
INSERT INTO preguntas_opciones (pregunta_id, opcion_id) VALUES (2,1);
INSERT INTO preguntas_opciones (pregunta_id, opcion_id) VALUES (2,2);

-- INSERT INTO usuarios_institutos (instituto_id, usuario_id) VALUES (1,1)
-- INSERT INTO usuarios_carreras (carrera_id, usuario_id) VALUES (1,1)
-- INSERT INTO usuarios_carreras (carrera_id, usuario_id) VALUES (2,2)
INSERT INTO dispositivos (id, so, ip, mac) VALUES (1, 'Linux', '172.45.14.154', '74-40-BB-B8-5A-47')
INSERT INTO dispositivos (id, so, ip, mac) VALUES (2, 'Windows', '172.32.143.84', '0A-00-27-00-00-2B')
INSERT INTO dispositivos_encuestas (encuesta_id, dispositivo_id) VALUES (1, 1)
INSERT INTO dispositivos_encuestas (encuesta_id, dispositivo_id) VALUES (1, 2)


INSERT INTO roles (nombre) VALUES ('ROLE_USER');
INSERT INTO roles (nombre) VALUES ('ROLE_ADMIN');

INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (1,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,2);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (2,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (3,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (4,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (5,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (6,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (7,1);
INSERT INTO usuarios_roles (usuario_id, role_id) VALUES (8,1);

INSERT INTO upr (usuario_id, pregunta_id, opcion_id) VALUES (3, 1, 1);
INSERT INTO upr (usuario_id, pregunta_id, opcion_id) VALUES (4, 1, 2);
INSERT INTO upr (usuario_id, pregunta_id, opcion_id) VALUES (5, 1, 1);
INSERT INTO upr (usuario_id, pregunta_id, opcion_id) VALUES (6, 2, 1);
INSERT INTO upr (usuario_id, pregunta_id, opcion_id) VALUES (7, 2, 2);
INSERT INTO upr (usuario_id, pregunta_id, opcion_id) VALUES (8, 2, 1);

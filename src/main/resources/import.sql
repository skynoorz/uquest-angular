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
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id, instituto_id) VALUES ('5464345','Fernandez', 'Arguedas','Maria','1990-01-15','Femenino','fernandez_maria@gmail.com', 'fema', '$2a$10$0nvA6Iyi6Nz3efVYsOdxV.NY/Wq8hC47alWcm1PtEeqzmlfIBUFe2', 1, '2020-05-25',4, 3)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('10535687','Helguero', 'Almanza','Roberto','1995-12-30','Masculino','helguero_roberto@gmail.com', 'hero', '$2a$10$GmZXKaj5ruBhYUpR38czPemYSXbX70L6nXxTivbqr8r1b6d3uJO2C', 1, '2020-05-25',4)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('8623456','Garcia', 'Almendra','Simon','1999-01-25','Masculino','garcia_simon@hotmail.com', 'gaal', '$2a$10$u7qYK6li3i7iLTEFuGsyEesLuMrXjcNnxSuAzOaRjf/SDtk33Fsnm', 1, '2020-05-25',5)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('9352652','Gomez', 'Amestoy','Jaime','1991-09-24','Masculino','gomez_jaime@gmail.com', 'goja', '$2a$10$EagYqd1i/DmgHbaqbVK.f.w8cKqpfN.aDAI9Er9/NdBoxPHrolCii', 1, '2020-05-25',6)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('5689782','Jimenez', 'Bernan','Ximena','1992-07-08','Femenino','jimenez_ximena@outlook.com', 'jixi', '$2a$10$O5nEUUHAoyNN9TprE6xlReX5QYCFFsb.mi6/wuLiNNkPkHu8d56ye', 1, '2020-05-25',1)
INSERT INTO usuarios (ci, apellido_pat, apellido_mat, nombres, fnac, sexo, email, username, password, enabled, create_at, carrera_id) VALUES ('15389672','Loza', 'Benavidez','Rosalia','2000-02-13','Masculino','loza_rosalia@yahoo.com', 'loro', '$2a$10$N7fpwCjH515F34wVfI4nD.6WiCWwiIOeIDGVNIbIlGsipLtfWnt2e', 1, '2020-05-25',2)
INSERT INTO categorias (nombre, descripcion) VALUES ('Elecciones','Temporadas para las elecciones electorales dentro la UMSA');
INSERT INTO categorias (nombre, descripcion) VALUES ('Materias','Materias dentro de tu carrera');
INSERT INTO categorias (nombre, descripcion) VALUES ('Docentes','Opinion respecto a docentes');
INSERT INTO categorias (nombre, descripcion) VALUES ('Otros','Otros');

INSERT INTO encuestas (id,titulo,descripcion, tipo, create_at, fecha_ini, fecha_fin, categoria_id, usuario_id) VALUES (1, 'Discriminacion de los estudios','Existira alguna discriminacion por parte de los alumnos dentro de la carrera?, la discriminación se puede dar de manera silenciosa o evidente y puede provocar daño moral, económico o psicológico.', 'Abierto', '2019-08-28', '2019-08-28', '2019-08-30', 1, 1);
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


insert into encuestas (create_at, fecha_fin, fecha_ini, tipo, titulo, descripcion, categoria_id, usuario_id) values ('2020-09-08', '2020-09-24 01:00:00', '2020-09-08 01:00:00', 'Abierto', 'INF - 381','Encuesta simple respecto a la materia de INF-181 y sus avances con el docente.', 1, 1)
-- insert into preguntas (create_at, descripcion, encuesta_id, tipo) values ('2020-09-08', 'Evaluacion de examenes', 2, 'Casillas de Verificacion')
insert into preguntas (create_at, descripcion, encuesta_id, tipo) values ('2020-09-08', 'Evaluacion de examenes', 2, 'Opcion Multiple')
insert into opciones (texto, tipo) values ('25%, 25%, 50%', 3)
insert into opciones (texto, tipo) values ('30%, 30%, 40%', 3)
insert into opciones (texto, tipo) values ('35%, 35%, 30%', 3)
insert into preguntas_opciones (pregunta_id, opcion_id) values (3, 3)
insert into preguntas_opciones (pregunta_id, opcion_id) values (3, 4)
insert into preguntas_opciones (pregunta_id, opcion_id) values (3, 5)
insert into preguntas (create_at, descripcion, encuesta_id, tipo) values ('2020-09-08', 'Cual es la mencion con la que piensa salir de la carrera?', 2, 'Respuesta Simple')
insert into preguntas (create_at, descripcion, encuesta_id, tipo) values ('2020-09-08', 'Explique a detalle la espectativa de esta materia segun usted', 2, 'Parrafo')
insert into preguntas (create_at, descripcion, encuesta_id, tipo) values ('2020-09-08', 'Califique a su docente actual entre 1 a 10', 2, 'Escala Lineal')
insert into opciones (max_value, min_value, tipo) values (10, 1, 5)

-- insert into preguntas_opciones (pregunta_id, opcion_id) values (5, 6)
-- insert into preguntas_opciones (pregunta_id, opcion_id) values (6, 7)
insert into preguntas_opciones (pregunta_id, opcion_id) values (6, 6)

-- INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (3, 1, 1);
-- INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (4, 1, 1);
-- INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (5, 1, 2);
-- INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (6, 2, 2);
-- INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (7, 2, 2);
-- INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (8, 2, 2);

-- ENCUESTA CLASES VIRTUALES
insert into encuestas (create_at, fecha_fin, fecha_ini, tipo, titulo, descripcion, categoria_id, usuario_id) values ('2020-09-24', '2020-10-24 01:00:00', '2020-09-24 01:00:00', 'Abierto', 'Clases Virtuales','Encuesta para saber la opinion de los estudiatnes respecto a las satisfaccion de las clases virtuales.', 1, 3)
insert into preguntas (id, create_at, descripcion, encuesta_id, tipo) values (7, '2020-09-24', '¿Que te parecio las clases en modalidad presencial?', 3, 'Parrafo')
insert into preguntas (id, create_at, descripcion, encuesta_id, tipo) values (8, '2020-09-24', 'Califica del 1 al 10 las clases virtuales en cuanto a calidad', 3, 'Escala Lineal')
insert into opciones (id, max_value, min_value, tipo) values (7, 10, 1, 5)
insert into preguntas (id, create_at, descripcion, encuesta_id, tipo) values (9, '2020-09-24', '¿Que plataformas utilizaste para tus clases virtuales?', 3, 'Casillas de Verificacion')
insert into opciones (id, texto, tipo) values (8, 'Zoom', 3)
insert into opciones (id, texto, tipo) values (9, 'Microsoft Teams', 3)
insert into opciones (id, texto, tipo) values (10, 'Jitsi', 3)
insert into opciones (id, texto, tipo) values (11, 'Google Meet', 3)
insert into opciones (id, texto, tipo) values (12, 'Otros', 3)
insert into preguntas (id, create_at, descripcion, encuesta_id, tipo) values (10, '2020-09-24', '¿Que plataforma usaste con mas frecuencia?', 3, 'Opcion Multiple')
insert into opciones (id, texto, tipo) values (13, 'Zoom', 3)
insert into opciones (id, texto, tipo) values (14, 'Microsoft Teams', 3)
insert into opciones (id, texto, tipo) values (15, 'Jitsi', 3)
insert into opciones (id, texto, tipo) values (16, 'Google Meet', 3)
insert into opciones (id, texto, tipo) values (17, 'Otros', 3)
insert into preguntas_opciones (pregunta_id, opcion_id) values (8, 7)
insert into preguntas_opciones (pregunta_id, opcion_id) values (9, 8)
insert into preguntas_opciones (pregunta_id, opcion_id) values (9, 9)
insert into preguntas_opciones (pregunta_id, opcion_id) values (9, 10)
insert into preguntas_opciones (pregunta_id, opcion_id) values (9, 11)
insert into preguntas_opciones (pregunta_id, opcion_id) values (9, 12)
insert into preguntas_opciones (pregunta_id, opcion_id) values (10, 13)
insert into preguntas_opciones (pregunta_id, opcion_id) values (10, 14)
insert into preguntas_opciones (pregunta_id, opcion_id) values (10, 15)
insert into preguntas_opciones (pregunta_id, opcion_id) values (10, 16)
insert into preguntas_opciones (pregunta_id, opcion_id) values (10, 17)
-- respuestas usuario 4 Helguero
INSERT INTO respuestas (usuario_id, pregunta_id, text_value) VALUES (4, 7, 'Dependiendo el docente encargado para que la enseñanza llegue a ser buena');
INSERT INTO respuestas (usuario_id, pregunta_id, num_value) VALUES (4, 8, 7);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (4, 9, 10);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (4, 9, 11);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (4, 10, 16);
-- respuestas usuario 5 Garcia
INSERT INTO respuestas (usuario_id, pregunta_id, text_value) VALUES (5, 7, 'Me parecio muy buena en todas las materias');
INSERT INTO respuestas (usuario_id, pregunta_id, num_value) VALUES (5, 8, 9);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (5, 9, 8);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (5, 9, 10);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (5, 9, 11);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (5, 10, 15);
-- respuestas usuario 6 Gomez
INSERT INTO respuestas (usuario_id, pregunta_id, text_value) VALUES (6, 7, 'Pesima, prefiero las clases en modalidad presencial');
INSERT INTO respuestas (usuario_id, pregunta_id, num_value) VALUES (6, 8, 1);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (6, 9, 10);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (6, 9, 11);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (6, 10, 16);
-- respuestas usuario 7 Jimenez
INSERT INTO respuestas (usuario_id, pregunta_id, text_value) VALUES (7, 7, 'Regular, hubo algunos docentes que no sabian usar las plataformas de comunicacion.');
INSERT INTO respuestas (usuario_id, pregunta_id, num_value) VALUES (7, 8, 5);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (7, 9, 9);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (7, 9, 10);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (7, 9, 11);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (7, 10, 15);
-- respuestas usuario 8 Loza
INSERT INTO respuestas (usuario_id, pregunta_id, text_value) VALUES (8, 7, 'Me gusto esta nueva modalidad de enseñanza, es mas moderna y creo que debemos habituarnos');
INSERT INTO respuestas (usuario_id, pregunta_id, num_value) VALUES (8, 8, 10);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (8, 9, 11);
INSERT INTO respuestas (usuario_id, pregunta_id, opcion_id) VALUES (8, 10, 16);

-- vistas
-- CREATE VIEW respuestas_stats_op AS
-- SELECT pregunta_id, opcion_id AS resp, count(1) AS resp_count FROM respuestas
-- WHERE opcion_id IS NOT NULL
-- GROUP BY pregunta_id, opcion_id;
--
-- CREATE view respuestas_stats_esc as
-- SELECT pregunta_id, num_value AS resp, count(1) AS resp_count FROM respuestas
-- WHERE num_value IS NOT NULL
-- GROUP BY pregunta_id, num_value;

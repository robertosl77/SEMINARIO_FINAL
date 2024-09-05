-- SQLite
-- select * from afectaciones;
-- select * from afectaciones_afectados;
-- select * from afectaciones_elementos;
-- select * from afectaciones_elementos;
-- select cuenta, count(1) from clientes group by cuenta having count(1)>1;

-- DELETE from afectaciones;
-- DELETE from afectaciones_afectados;
-- DELETE from afectaciones_elementos;
-- DELETE from afectaciones_elementos;
-- DELETE FROM sqlite_sequence WHERE name='afectaciones';
-- DELETE FROM sqlite_sequence WHERE name='afectaciones_afectados';
-- DELETE FROM sqlite_sequence WHERE name='afectaciones_elementos';
-- DELETE FROM sqlite_sequence WHERE name='afectaciones_elementos';
-- VACUUM;

-- select ct, count(1) from ct group by ct having count(1)>0;
-- select ct from ct where ct=1111;
-- select count(1) from afectaciones_afectados;

-- SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion 
-- select *
-- FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
-- where 
-- a.idafectacion=e.idafectacion
-- and e.ct=af.ct
-- and e.logfin=0
;




-- PRAGMA foreign_keys = OFF;
-- DELETE from artefactos;
-- DELETE from clientes_artefactos;
-- VACUUM;
-- PRAGMA foreign_keys = ON;

select * from artefactos;

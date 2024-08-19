from flask import Flask, request, jsonify, session, redirect, url_for
from bd.CreateTables import CreateTables
from jsons.JsonValidador import JsonValidador


class Simulados:
    def CreaTablaGeografico(self):
        authenticator= JsonValidador()
        json= authenticator.leer_json_geografico()
        #
        bd= CreateTables()
        resp= bd.crear_tabla_geografico()
        if resp:
            resp= bd.insertar_datos_geografico(json)
        #Cierro conexion
        bd.cerrar_conexion()
        return jsonify({"respuesta": resp})   

    def CreaTablaRed(self):
        authenticator= JsonValidador()
        bd= CreateTables()
        try:
            #ssee
            json= authenticator.leer_json_red('jsons/ssee.json')
            resp= bd.crear_tabla_ssee()
            if resp:
                resp= bd.insertar_datos_ssee(json)
                #alim
                json= authenticator.leer_json_red('jsons/alim.json')
                if resp:
                    resp= bd.crear_tabla_alim()
                    if resp:
                        resp= bd.insertar_datos_alim(json)
                        #ct
                        json= authenticator.leer_json_red('jsons/ct.json')
                        if resp:
                            resp= bd.crear_tabla_ct()
                            if resp:
                                resp= bd.insertar_datos_ct(json)
        except Exception as e:
            resp=False
        finally:
            #Cierro conexion
            bd.cerrar_conexion()
        return jsonify({"respuesta": resp})  

    def CreaTablaLog(self):
        bd= CreateTables()
        resp= bd.crear_tabla_log()
        bd.cerrar_conexion()
        return jsonify({"respuesta": resp})

    def CreaTablaClientes(self):
        authenticator= JsonValidador()
        bd= CreateTables()
        json_clientes= authenticator.leer_json_red('jsons/clientes.json')
        json_ct= authenticator.leer_json_red('jsons/ct.json')
        resp= bd.crear_tabla_clientes()
        resp= bd.insertar_datos_clientes(json_clientes, json_ct)
        bd.cerrar_conexion()
        return jsonify({"respuesta": resp})
    
    def CreaTablaPacientes(self):
        authenticator= JsonValidador()
        bd= CreateTables()
        json_diagnostico= authenticator.leer_json_red('jsons/diagnostico.json')
        json_riesgo= authenticator.leer_json_red('jsons/riesgo.json')
        resp= bd.crear_tabla_pacientes()
        resp= bd.insertar_datos_pacientes(json_diagnostico, json_riesgo)
        bd.cerrar_conexion()
        return jsonify({"respuesta": resp})    
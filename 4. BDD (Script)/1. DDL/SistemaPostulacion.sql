PGDMP         -                {            SistemaPostulacion    15.3    15.3 ^    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17207    SistemaPostulacion    DATABASE     �   CREATE DATABASE "SistemaPostulacion" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Ecuador.1252';
 $   DROP DATABASE "SistemaPostulacion";
                postgres    false            �            1259    17405 	   actividad    TABLE     �   CREATE TABLE public.actividad (
    act_id integer NOT NULL,
    act_nombre character varying(50) NOT NULL,
    act_descripcion character varying(250) NOT NULL
);
    DROP TABLE public.actividad;
       public         heap    postgres    false            �            1259    17456    actividad_act_id_seq    SEQUENCE     �   ALTER TABLE public.actividad ALTER COLUMN act_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.actividad_act_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    240            �            1259    17208    campo_amplio    TABLE     �   CREATE TABLE public.campo_amplio (
    ca_id integer NOT NULL,
    ca_nombre character varying(50) NOT NULL,
    ca_descripcion character varying(250) NOT NULL
);
     DROP TABLE public.campo_amplio;
       public         heap    postgres    false            �            1259    17335    campo_amplio_ca_id_seq    SEQUENCE     �   ALTER TABLE public.campo_amplio ALTER COLUMN ca_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.campo_amplio_ca_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    17213    campo_especifico    TABLE     �   CREATE TABLE public.campo_especifico (
    ce_id integer NOT NULL,
    ce_nombre character varying(50) NOT NULL,
    ce_descripcion character varying(250) NOT NULL,
    ca_id integer
);
 $   DROP TABLE public.campo_especifico;
       public         heap    postgres    false            �            1259    17337    campo_especifico_ce_id_seq    SEQUENCE     �   ALTER TABLE public.campo_especifico ALTER COLUMN ce_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.campo_especifico_ce_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    17218 	   candidato    TABLE     b  CREATE TABLE public.candidato (
    cand_tipo_identificacion character varying(20) NOT NULL,
    cand_num_identificacion character varying(20) NOT NULL,
    cand_sexo character(1) NOT NULL,
    cand_titulo character varying(20) NOT NULL,
    cand_fecha_nacimiento date NOT NULL,
    cand_id integer NOT NULL,
    cand_correo character varying(50) NOT NULL,
    cand_password character varying(100) NOT NULL,
    cand_nombre1 character varying(30) NOT NULL,
    cand_nombre2 character varying(30) NOT NULL,
    cand_apellido1 character varying(30) NOT NULL,
    cand_apellido2 character varying(30) NOT NULL
);
    DROP TABLE public.candidato;
       public         heap    postgres    false            �            1259    17339    candidato_cand_id_seq    SEQUENCE     �   ALTER TABLE public.candidato ALTER COLUMN cand_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.candidato_cand_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    17223    contratacion    TABLE     r   CREATE TABLE public.contratacion (
    con_id integer NOT NULL,
    con_nombre character varying(150) NOT NULL
);
     DROP TABLE public.contratacion;
       public         heap    postgres    false            �            1259    17340    contratacion_con_id_seq    SEQUENCE     �   ALTER TABLE public.contratacion ALTER COLUMN con_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.contratacion_con_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    17228    departamento    TABLE     �   CREATE TABLE public.departamento (
    dept_id integer NOT NULL,
    dept_nombre character varying(50) NOT NULL,
    dept_descripcion character varying(250) NOT NULL
);
     DROP TABLE public.departamento;
       public         heap    postgres    false            �            1259    17342    departamento_dept_id_seq    SEQUENCE     �   ALTER TABLE public.departamento ALTER COLUMN dept_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.departamento_dept_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    17233    item    TABLE     z   CREATE TABLE public.item (
    it_id integer NOT NULL,
    pa_id integer,
    it_nombre character varying(50) NOT NULL
);
    DROP TABLE public.item;
       public         heap    postgres    false            �            1259    17344    item_it_id_seq    SEQUENCE     �   ALTER TABLE public.item ALTER COLUMN it_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.item_it_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    17410    oferta    TABLE       CREATE TABLE public.oferta (
    ofe_id integer NOT NULL,
    post_id integer,
    con_id integer,
    ce_id integer,
    ca_id integer,
    sede_id integer,
    dept_id integer,
    pa_id integer,
    act_id integer,
    ofe_vacantes integer,
    ofe_horas integer
);
    DROP TABLE public.oferta;
       public         heap    postgres    false            �            1259    17455    oferta_ofe_id_seq    SEQUENCE     �   ALTER TABLE public.oferta ALTER COLUMN ofe_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.oferta_ofe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    241            �            1259    17238    personal_academico    TABLE     �   CREATE TABLE public.personal_academico (
    pa_id integer NOT NULL,
    pa_nombre character varying(50) NOT NULL,
    pa_descripcion character varying(250) NOT NULL
);
 &   DROP TABLE public.personal_academico;
       public         heap    postgres    false            �            1259    17346    personal_academico_pa_id_seq    SEQUENCE     �   ALTER TABLE public.personal_academico ALTER COLUMN pa_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.personal_academico_pa_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    17243    postulacion    TABLE     s   CREATE TABLE public.postulacion (
    post_id integer NOT NULL,
    post_periodo character varying(10) NOT NULL
);
    DROP TABLE public.postulacion;
       public         heap    postgres    false            �            1259    17347    postulacion_post_id_seq    SEQUENCE     �   ALTER TABLE public.postulacion ALTER COLUMN post_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.postulacion_post_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    17248    rechum    TABLE     �  CREATE TABLE public.rechum (
    rh_cargo character varying(20) NOT NULL,
    rh_id integer NOT NULL,
    rh_correo character varying(50) NOT NULL,
    rh_password character varying(100) NOT NULL,
    rh_nombre1 character varying(30) NOT NULL,
    rh_nombre2 character varying(30) NOT NULL,
    rh_apellido1 character varying(30) NOT NULL,
    rh_apellido2 character varying(30) NOT NULL
);
    DROP TABLE public.rechum;
       public         heap    postgres    false            �            1259    17348    rechum_rh_id_seq    SEQUENCE     �   ALTER TABLE public.rechum ALTER COLUMN rh_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.rechum_rh_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    17253 	   requisito    TABLE     �   CREATE TABLE public.requisito (
    rq_id integer NOT NULL,
    it_id integer,
    rq_descripcion character varying(750) NOT NULL
);
    DROP TABLE public.requisito;
       public         heap    postgres    false            �            1259    17349    requisito_rq_id_seq    SEQUENCE     �   ALTER TABLE public.requisito ALTER COLUMN rq_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.requisito_rq_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    223            �            1259    17258    sede    TABLE     �   CREATE TABLE public.sede (
    sede_id integer NOT NULL,
    sede_nombre character varying(50) NOT NULL,
    sede_descripcion character varying(250) NOT NULL
);
    DROP TABLE public.sede;
       public         heap    postgres    false            �            1259    17351    sede_sede_id_seq    SEQUENCE     �   ALTER TABLE public.sede ALTER COLUMN sede_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sede_sede_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    17263 	   solicitud    TABLE     �   CREATE TABLE public.solicitud (
    cand_id integer NOT NULL,
    sol_id integer NOT NULL,
    sol_aprobacion boolean NOT NULL,
    ofe_id integer
);
    DROP TABLE public.solicitud;
       public         heap    postgres    false            �            1259    17353    solicitud_sol_id_seq    SEQUENCE     �   ALTER TABLE public.solicitud ALTER COLUMN sol_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.solicitud_sol_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    225            �            1259    17268 
   titulo_exp    TABLE     m  CREATE TABLE public.titulo_exp (
    tx_id integer NOT NULL,
    rq_id integer,
    tx_descripcion character varying(250) NOT NULL,
    tx_detalle character varying(500) NOT NULL,
    tx_puntaje_min numeric(4,2) NOT NULL,
    tx_puntaje_max numeric(4,2) NOT NULL,
    tx_puntaje_asignado numeric(4,2) NOT NULL,
    tx_observacion character varying(500) NOT NULL
);
    DROP TABLE public.titulo_exp;
       public         heap    postgres    false            �            1259    17359    titulo_exp_tx_id_seq    SEQUENCE     �   ALTER TABLE public.titulo_exp ALTER COLUMN tx_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.titulo_exp_tx_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �          0    17405 	   actividad 
   TABLE DATA           H   COPY public.actividad (act_id, act_nombre, act_descripcion) FROM stdin;
    public          postgres    false    240   �t       f          0    17208    campo_amplio 
   TABLE DATA           H   COPY public.campo_amplio (ca_id, ca_nombre, ca_descripcion) FROM stdin;
    public          postgres    false    214   ^u       g          0    17213    campo_especifico 
   TABLE DATA           S   COPY public.campo_especifico (ce_id, ce_nombre, ce_descripcion, ca_id) FROM stdin;
    public          postgres    false    215   �u       h          0    17218 	   candidato 
   TABLE DATA           �   COPY public.candidato (cand_tipo_identificacion, cand_num_identificacion, cand_sexo, cand_titulo, cand_fecha_nacimiento, cand_id, cand_correo, cand_password, cand_nombre1, cand_nombre2, cand_apellido1, cand_apellido2) FROM stdin;
    public          postgres    false    216   �u       i          0    17223    contratacion 
   TABLE DATA           :   COPY public.contratacion (con_id, con_nombre) FROM stdin;
    public          postgres    false    217   �v       j          0    17228    departamento 
   TABLE DATA           N   COPY public.departamento (dept_id, dept_nombre, dept_descripcion) FROM stdin;
    public          postgres    false    218   �w       k          0    17233    item 
   TABLE DATA           7   COPY public.item (it_id, pa_id, it_nombre) FROM stdin;
    public          postgres    false    219   �x       �          0    17410    oferta 
   TABLE DATA           �   COPY public.oferta (ofe_id, post_id, con_id, ce_id, ca_id, sede_id, dept_id, pa_id, act_id, ofe_vacantes, ofe_horas) FROM stdin;
    public          postgres    false    241   y       l          0    17238    personal_academico 
   TABLE DATA           N   COPY public.personal_academico (pa_id, pa_nombre, pa_descripcion) FROM stdin;
    public          postgres    false    220   ~y       m          0    17243    postulacion 
   TABLE DATA           <   COPY public.postulacion (post_id, post_periodo) FROM stdin;
    public          postgres    false    221   z       n          0    17248    rechum 
   TABLE DATA           }   COPY public.rechum (rh_cargo, rh_id, rh_correo, rh_password, rh_nombre1, rh_nombre2, rh_apellido1, rh_apellido2) FROM stdin;
    public          postgres    false    222   8z       o          0    17253 	   requisito 
   TABLE DATA           A   COPY public.requisito (rq_id, it_id, rq_descripcion) FROM stdin;
    public          postgres    false    223   qz       p          0    17258    sede 
   TABLE DATA           F   COPY public.sede (sede_id, sede_nombre, sede_descripcion) FROM stdin;
    public          postgres    false    224   �~       q          0    17263 	   solicitud 
   TABLE DATA           L   COPY public.solicitud (cand_id, sol_id, sol_aprobacion, ofe_id) FROM stdin;
    public          postgres    false    225   �~       r          0    17268 
   titulo_exp 
   TABLE DATA           �   COPY public.titulo_exp (tx_id, rq_id, tx_descripcion, tx_detalle, tx_puntaje_min, tx_puntaje_max, tx_puntaje_asignado, tx_observacion) FROM stdin;
    public          postgres    false    226   ;       �           0    0    actividad_act_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.actividad_act_id_seq', 7, true);
          public          postgres    false    243            �           0    0    campo_amplio_ca_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.campo_amplio_ca_id_seq', 4, true);
          public          postgres    false    227            �           0    0    campo_especifico_ce_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.campo_especifico_ce_id_seq', 2, true);
          public          postgres    false    228            �           0    0    candidato_cand_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.candidato_cand_id_seq', 6, true);
          public          postgres    false    229            �           0    0    contratacion_con_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.contratacion_con_id_seq', 3, true);
          public          postgres    false    230            �           0    0    departamento_dept_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.departamento_dept_id_seq', 13, true);
          public          postgres    false    231            �           0    0    item_it_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.item_it_id_seq', 4, true);
          public          postgres    false    232            �           0    0    oferta_ofe_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.oferta_ofe_id_seq', 10, true);
          public          postgres    false    242            �           0    0    personal_academico_pa_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.personal_academico_pa_id_seq', 6, true);
          public          postgres    false    233            �           0    0    postulacion_post_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.postulacion_post_id_seq', 1, true);
          public          postgres    false    234            �           0    0    rechum_rh_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.rechum_rh_id_seq', 1, true);
          public          postgres    false    235            �           0    0    requisito_rq_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.requisito_rq_id_seq', 7, true);
          public          postgres    false    236            �           0    0    sede_sede_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.sede_sede_id_seq', 3, true);
          public          postgres    false    237            �           0    0    solicitud_sol_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.solicitud_sol_id_seq', 20, true);
          public          postgres    false    238            �           0    0    titulo_exp_tx_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.titulo_exp_tx_id_seq', 13, true);
          public          postgres    false    239            �           2606    17409    actividad actividad_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.actividad
    ADD CONSTRAINT actividad_pkey PRIMARY KEY (act_id);
 B   ALTER TABLE ONLY public.actividad DROP CONSTRAINT actividad_pkey;
       public            postgres    false    240            �           2606    17212    campo_amplio campo_amplio_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.campo_amplio
    ADD CONSTRAINT campo_amplio_pkey PRIMARY KEY (ca_id);
 H   ALTER TABLE ONLY public.campo_amplio DROP CONSTRAINT campo_amplio_pkey;
       public            postgres    false    214            �           2606    17217 &   campo_especifico campo_especifico_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.campo_especifico
    ADD CONSTRAINT campo_especifico_pkey PRIMARY KEY (ce_id);
 P   ALTER TABLE ONLY public.campo_especifico DROP CONSTRAINT campo_especifico_pkey;
       public            postgres    false    215            �           2606    17222    candidato candidato_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.candidato
    ADD CONSTRAINT candidato_pkey PRIMARY KEY (cand_id);
 B   ALTER TABLE ONLY public.candidato DROP CONSTRAINT candidato_pkey;
       public            postgres    false    216            �           2606    17227    contratacion contratacion_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.contratacion
    ADD CONSTRAINT contratacion_pkey PRIMARY KEY (con_id);
 H   ALTER TABLE ONLY public.contratacion DROP CONSTRAINT contratacion_pkey;
       public            postgres    false    217            �           2606    17232    departamento departamento_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_pkey PRIMARY KEY (dept_id);
 H   ALTER TABLE ONLY public.departamento DROP CONSTRAINT departamento_pkey;
       public            postgres    false    218            �           2606    17237    item item_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (it_id);
 8   ALTER TABLE ONLY public.item DROP CONSTRAINT item_pkey;
       public            postgres    false    219            �           2606    17414    oferta oferta_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.oferta
    ADD CONSTRAINT oferta_pkey PRIMARY KEY (ofe_id);
 <   ALTER TABLE ONLY public.oferta DROP CONSTRAINT oferta_pkey;
       public            postgres    false    241            �           2606    17242 *   personal_academico personal_academico_pkey 
   CONSTRAINT     k   ALTER TABLE ONLY public.personal_academico
    ADD CONSTRAINT personal_academico_pkey PRIMARY KEY (pa_id);
 T   ALTER TABLE ONLY public.personal_academico DROP CONSTRAINT personal_academico_pkey;
       public            postgres    false    220            �           2606    17247    postulacion postulacion_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.postulacion
    ADD CONSTRAINT postulacion_pkey PRIMARY KEY (post_id);
 F   ALTER TABLE ONLY public.postulacion DROP CONSTRAINT postulacion_pkey;
       public            postgres    false    221            �           2606    17252    rechum rechum_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.rechum
    ADD CONSTRAINT rechum_pkey PRIMARY KEY (rh_id);
 <   ALTER TABLE ONLY public.rechum DROP CONSTRAINT rechum_pkey;
       public            postgres    false    222            �           2606    17257    requisito requisito_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.requisito
    ADD CONSTRAINT requisito_pkey PRIMARY KEY (rq_id);
 B   ALTER TABLE ONLY public.requisito DROP CONSTRAINT requisito_pkey;
       public            postgres    false    223            �           2606    17262    sede sede_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.sede
    ADD CONSTRAINT sede_pkey PRIMARY KEY (sede_id);
 8   ALTER TABLE ONLY public.sede DROP CONSTRAINT sede_pkey;
       public            postgres    false    224            �           2606    17469    solicitud solicitud_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.solicitud
    ADD CONSTRAINT solicitud_pkey PRIMARY KEY (sol_id);
 B   ALTER TABLE ONLY public.solicitud DROP CONSTRAINT solicitud_pkey;
       public            postgres    false    225            �           2606    17274    titulo_exp titulo_exp_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.titulo_exp
    ADD CONSTRAINT titulo_exp_pkey PRIMARY KEY (tx_id);
 D   ALTER TABLE ONLY public.titulo_exp DROP CONSTRAINT titulo_exp_pkey;
       public            postgres    false    226            �           2606    17415    oferta fk_relationship_15    FK CONSTRAINT     �   ALTER TABLE ONLY public.oferta
    ADD CONSTRAINT fk_relationship_15 FOREIGN KEY (post_id) REFERENCES public.postulacion(post_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public.oferta DROP CONSTRAINT fk_relationship_15;
       public          postgres    false    241    3258    221            �           2606    17420    oferta fk_relationship_16    FK CONSTRAINT     �   ALTER TABLE ONLY public.oferta
    ADD CONSTRAINT fk_relationship_16 FOREIGN KEY (con_id) REFERENCES public.contratacion(con_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public.oferta DROP CONSTRAINT fk_relationship_16;
       public          postgres    false    217    3250    241            �           2606    17425    oferta fk_relationship_17    FK CONSTRAINT     �   ALTER TABLE ONLY public.oferta
    ADD CONSTRAINT fk_relationship_17 FOREIGN KEY (ce_id) REFERENCES public.campo_especifico(ce_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public.oferta DROP CONSTRAINT fk_relationship_17;
       public          postgres    false    241    3246    215            �           2606    17430    oferta fk_relationship_18    FK CONSTRAINT     �   ALTER TABLE ONLY public.oferta
    ADD CONSTRAINT fk_relationship_18 FOREIGN KEY (ca_id) REFERENCES public.campo_amplio(ca_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public.oferta DROP CONSTRAINT fk_relationship_18;
       public          postgres    false    241    3244    214            �           2606    17435    oferta fk_relationship_19    FK CONSTRAINT     �   ALTER TABLE ONLY public.oferta
    ADD CONSTRAINT fk_relationship_19 FOREIGN KEY (sede_id) REFERENCES public.sede(sede_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public.oferta DROP CONSTRAINT fk_relationship_19;
       public          postgres    false    224    241    3264            �           2606    17325    solicitud fk_relationship_2    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitud
    ADD CONSTRAINT fk_relationship_2 FOREIGN KEY (cand_id) REFERENCES public.candidato(cand_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.solicitud DROP CONSTRAINT fk_relationship_2;
       public          postgres    false    225    3248    216            �           2606    17440    oferta fk_relationship_20    FK CONSTRAINT     �   ALTER TABLE ONLY public.oferta
    ADD CONSTRAINT fk_relationship_20 FOREIGN KEY (dept_id) REFERENCES public.departamento(dept_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public.oferta DROP CONSTRAINT fk_relationship_20;
       public          postgres    false    218    3252    241            �           2606    17445    oferta fk_relationship_21    FK CONSTRAINT     �   ALTER TABLE ONLY public.oferta
    ADD CONSTRAINT fk_relationship_21 FOREIGN KEY (pa_id) REFERENCES public.personal_academico(pa_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public.oferta DROP CONSTRAINT fk_relationship_21;
       public          postgres    false    241    3256    220            �           2606    17450    oferta fk_relationship_22    FK CONSTRAINT     �   ALTER TABLE ONLY public.oferta
    ADD CONSTRAINT fk_relationship_22 FOREIGN KEY (act_id) REFERENCES public.actividad(act_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 C   ALTER TABLE ONLY public.oferta DROP CONSTRAINT fk_relationship_22;
       public          postgres    false    241    3270    240            �           2606    17457 #   campo_especifico fk_relationship_23    FK CONSTRAINT     �   ALTER TABLE ONLY public.campo_especifico
    ADD CONSTRAINT fk_relationship_23 FOREIGN KEY (ca_id) REFERENCES public.campo_amplio(ca_id) NOT VALID;
 M   ALTER TABLE ONLY public.campo_especifico DROP CONSTRAINT fk_relationship_23;
       public          postgres    false    3244    214    215            �           2606    17462    solicitud fk_relationship_24    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitud
    ADD CONSTRAINT fk_relationship_24 FOREIGN KEY (ofe_id) REFERENCES public.oferta(ofe_id) NOT VALID;
 F   ALTER TABLE ONLY public.solicitud DROP CONSTRAINT fk_relationship_24;
       public          postgres    false    3272    225    241            �           2606    17470    solicitud fk_relationship_31    FK CONSTRAINT     �   ALTER TABLE ONLY public.solicitud
    ADD CONSTRAINT fk_relationship_31 FOREIGN KEY (cand_id) REFERENCES public.candidato(cand_id) NOT VALID;
 F   ALTER TABLE ONLY public.solicitud DROP CONSTRAINT fk_relationship_31;
       public          postgres    false    225    3248    216            �           2606    17295    item fk_relationship_5    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT fk_relationship_5 FOREIGN KEY (pa_id) REFERENCES public.personal_academico(pa_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 @   ALTER TABLE ONLY public.item DROP CONSTRAINT fk_relationship_5;
       public          postgres    false    220    219    3256            �           2606    17300    requisito fk_relationship_6    FK CONSTRAINT     �   ALTER TABLE ONLY public.requisito
    ADD CONSTRAINT fk_relationship_6 FOREIGN KEY (it_id) REFERENCES public.item(it_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public.requisito DROP CONSTRAINT fk_relationship_6;
       public          postgres    false    223    3254    219            �           2606    17330    titulo_exp fk_relationship_7    FK CONSTRAINT     �   ALTER TABLE ONLY public.titulo_exp
    ADD CONSTRAINT fk_relationship_7 FOREIGN KEY (rq_id) REFERENCES public.requisito(rq_id) ON UPDATE RESTRICT ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public.titulo_exp DROP CONSTRAINT fk_relationship_7;
       public          postgres    false    3262    223    226            �   q   x�3�t�ON�K�L�3��8=��R�K2��3o�C�*qs�e�%��@�9
�\&�RЌ�)�`�e���T@� ���)����t�U0�2����� n �N��+F��� +���      f   -   x�3�IM����O?�6��L�2���KO��L-I ��b���� U)[      g   J   x�3�IM����O?�6�X!%U!'Q�3/-�(719���<�O�`N#.#N���T��Ē�bN'Nc�=... 5�(      h   �   x���K�0EǷ{���Pq(;pҖƘ����$���	$*j���ɝ��>��z�!6$d��"�(���v�q�#.���Ώ�>�؆z
��o~��O/~sV���v�v��U�	2�Y$$$|]9�]{v�45v�d�*��j ?���R�`r��N`?3������8W|��W��kƫ^���3��_�j�3���b��\�z�      i   �   x�m�A
�@E��)�TA��p3����N=R�=�\�J�w��r=<�z� 	}�[!����G3K�d���� �ȡ���+L@Zҕ��O\V��I��)��T�J�g�1��/5LjR�[U�#�I$�K<���:4,x����&��c��Ҕ����rf      j     x�mQ�j�0��_�8B�@��ט6W�Y��!��C�N�+R�'�ǲ2!���]13;3��VIU�tBq&�IHCVB}���j�|��&�ͧQg�aU�60e���Et��5᱀yMs0�}A��6D��6�bᩐ�83�0��7:M1y���Q�������.�N4�l���{yXXq*��s*�o�ƾ�+�O3Z.h��&
P��ۍ���ɳ���-��5�Զx5峎�w<���7�Ļ�SYK���}%ն�����y,!�� �l}��      k   V   x�3���t�/�ML�<�9���w�ON�K�L�2���SJ���
�ɉ)�W�f&'r���\+
R�2�����R�3��s�b���� ��      �   `   x�e�]
�0���aF�������)� �h�4|j�b_�/j�����C��t��Fɺ��f�&$x{چ(i���KZ��me��D'[l��\ ^^�Y      l   �   x�3�t,����L,R��,K�Q0��2�tL/JMOL�G�A�2�(��K�,H́+��2�9�29/39_�%?95�$���)B*%U�'1)�(�$�(3S+vy.3�ye��%��ə�7�ᑂ����� Ėg�      m      x�3�420265����� S      n   )   x�KL����4�LtH�M���K���L�$�d��=... �|	/      o     x��U=oG��_1�	`����CA��wi�{Cj�����a�o��L�"p���X����ˢ�4��nvfޛyo/&�?�K$vT��֑�@l�����	T	�,���#S|0!M�$����}�wbZ�A�c��l��S��t��7Ug��������hC��x�b�n�E����R����@�M�r_����Z��W�4�
F��L��ߠU�.ef�=[�"����Zp|N�3��v#1i:�8������XR29��fW֡ڇN��ĕ56xv��s�r��E-�+�sn.(��@�C�8�:Z�X�*G|��|����M�ʶq�n�-mj�D�\ �|��]i�S�]w����>��Zq����y�EK�������6��4W�P��c�ݼ\�Z[�P3f�.+�I0�<-�E�J�Y���أu�S�bsѭ/d7!�$'�����@���;9�<ب�Go���&����>�����9݇�y�7{;��u��'�"A�+��_�������T2+"٩����LfE�I���z���+:�\�#q�TO` 	�Q�E�� Ӻ������j�����ca�,�D�-f ������DI�kU_E1�M�v��)��FQ�2�ND���	�Ғ�0���@�Z�� ��4�:������,�=(}m���9>�b^�Q���]IʦR����7���s��ь�ff^��گ�e�%ѩ�[��>��8����=�鲇����T�P���){ecS�I[_�G��4z
z5�7P`6�}�ҡ/%Dq�RY�$��)/c�K�o��1������q=Z�[�t#c7ɰ�UY G�#	�.�n���_;����V������M�GЁ��S0+Y���N�A����UV�!��V�=�r�6��A�{��v���q�We�ux�O^����Dx���������08Ҁ�ZC��S%��jq��3� �Ar�<�ӟ&W�	T!��Pe�}�������96
f�$	��:�D�qZ��g� ���J�daP�Q%��x��{�սv�Χ���ǯj      p   <   x�3��M,)ʬ�N�K��),��2��I,IL.�KOD���A*J�\�s3�*Qy\1z\\\ �N�      q   A   x�3�4�L�4�2� Җ@�J�F��F0c��0�1�`sd��a	5�b`� %�      r   �  x��W=s�6��_�&�F�(Y֕w�
����d�"�2nH��;��?�E�R��Xނ�HY�M�|�aX�}�a�����P�W=(�#�5�*��jy��:�鳘,F㱈��;��"�
�W�Y=��LA2�yi
�e\*�������2�G^&$�v/Yh2�t��NT"ck.X4J���`��}Nq�p�c;��Ù��S���͙�җ���z�R�v0����p^ӽ\d�fX�!iw;��n�w͓u����O����_K��L/��X!�V��y�Ot��Qi�J��E�Ñ�/&`2:��t�މ�8U��u���	���zL�a0�������DyD^L�z �]9�e用u�m�xd|r,��SRy�6��҄����Rϐ�E����T�����ܺzF��d�ǌ\����`(o�/�ܢ��B�/���h��9Њ�������{�prk�f��dlqk��`z4���L,ဲ�O&Tj$�)�	���!<�a7�������\�`	�i3'�.Ahw��)�yXEqP� �V��Ř5��b<�9*��ծ����ɺ�\��:1/���I�aԗ
$��ڵ�.ƍ�[iv���m)L&�X,os�B&�!�5�:2rL����N["g��l{⾟��2�V1|�Uq�paP���i��_��H'"�� �8�A)���o��,JNL �:����B�/Ѓ%ϗW��#m|�JZ���X9���7���T:oC2�^�O@\���ĸQ���Dӡ�8b�a��Iu�5A�Pgl�3��pF�$�j�����x�v�	�)����
�G�K3�O؇�H�b>9��!����-��N����l^�t��y2��C�Pt5��O#�^�"�}G�����h0����m{_�!����
�0}�C��r���E La~PU��G�ݼ%(�A|����}s̟�������|�{Λ^�/����?senn�u��/�:l��q�-�/a����Dj�����m�?�nbr�Ԭ�p��<B�WH�� �*��$Ёk[h��������ٿ�<w�E{��x����\�c��)�Cy��|$?���R\̙F�Ц T�	�sEn���esx���@�s$�R\�~$"�ڭ ��������
�,�8F�"�Nxɨ.��ř#�[��vt��ltO�1&�;M��;m�T��4	��|	I(%Mc M�$jn�O�ġ���?��O����?�e4��2��     
import type { Product } from "@/components/ProductCard";

import planner2027 from "@/assets/planner-2027.jpg";
import executiva from "@/assets/agenda-executiva.jpg";
import personalizada from "@/assets/agenda-personalizada.jpg";
import pocket from "@/assets/agenda-pocket.jpg";
import academica from "@/assets/agenda-academica.jpg";
import colecaoJesus from "@/assets/colecao-jesus.png";
import jesusBordeaux from "@/assets/jesus-bordeaux.png";
import jesusAzul from "@/assets/jesus-azul.png";
import delicada0 from "@/assets/delicada-0.jpg";
import delicada1 from "@/assets/delicada-1.jpg";
import delicada2 from "@/assets/delicada-2.jpg";
import delicada3 from "@/assets/delicada-3.jpg";
import cherry0 from "@/assets/cherry-0.jpg";
import cherry1 from "@/assets/cherry-1.jpg";
import masculina from "@/assets/masculina.jpg";
import mel from "@/assets/mel.jpg";
import fofa0 from "@/assets/fofa-0.jpg";
import fofa1 from "@/assets/fofa-1.jpg";
import fofa2 from "@/assets/fofa-2.jpg";
import fofa3 from "@/assets/fofa-3.jpg";
import planner0 from "@/assets/planner-0.jpg";
import planner1 from "@/assets/planner-1.jpg";
import planner2 from "@/assets/planner-2.jpg";
import sonho0 from "@/assets/sonho-0.jpg";
import sonho1 from "@/assets/sonho-1.jpg";
import sonho2 from "@/assets/sonho-2.jpg";
import livretoOracoes from "@/assets/livreto-oracoes.jpg";
import comercial from "@/assets/comercial.jpg";
import comercial1 from "@/assets/comercial-1.jpg";
import comercial2 from "@/assets/comercial-2.jpg";
import comercial3 from "@/assets/comercial-3.jpg";
import candy0 from "@/assets/candy-0.jpg";
import candy1 from "@/assets/candy-1.jpg";

export const products: Product[] = [
  {
    id: "jesus-colecao",
    name: "Agenda Coleção Jesus",
    description: "Disponível em Bordeaux e Azul",
    price: 70.0,
    image: jesusBordeaux,
    images: [jesusBordeaux, jesusAzul],
    tag: "Novo",
    rating: 5.0,
  },
  {
    id: "delicada-1",
    name: "Agenda Coleção Delicada",
    description: "4 variantes encantadoras",
    price: 70.0,
    image: delicada0,
    images: [delicada0, delicada1, delicada2, delicada3],
    rating: 4.8,
  },
  {
    id: "cherry-1",
    name: "Agenda Coleção Cherry",
    description: "2 variantes irresistíveis",
    price: 70.0,
    image: cherry0,
    images: [cherry0, cherry1],
    tag: "Novo",
    rating: 4.9,
  },
  {
    id: "masculina-1",
    name: "Agenda Coleção Masculina",
    description: "",
    price: 70.0,
    image: masculina,
    rating: 4.7,
  },
  {
    id: "mel-1",
    name: "Agenda Coleção Mel",
    description: "",
    price: 70.0,
    image: mel,
    tag: "Novo",
    rating: 4.9,
  },
  {
    id: "fofa-1",
    name: "Agenda Coleção Fofa",
    description: "4 variantes fofíssimas",
    price: 70.0,
    image: fofa0,
    images: [fofa0, fofa1, fofa2, fofa3],
    tag: "Novo",
    rating: 5.0,
  },
  {
    id: "planner-1",
    name: "Planner 2027",
    description: "3 variantes para o seu planejamento",
    price: 50.0,
    image: planner0,
    images: [planner0, planner1, planner2],
    tag: "Novo",
    rating: 4.9,
  },
  {
    id: "sonho-1",
    name: "Agenda Coleção Sonho",
    description: "3 variantes dos sonhos",
    price: 70.0,
    image: sonho0,
    images: [sonho0, sonho1, sonho2],
    tag: "Novo",
    rating: 5.0,
  },
  {
    id: "livreto-oracoes-1",
    name: "Livreto de Orações",
    description: "",
    price: 10.0,
    image: livretoOracoes,
    tag: "Novo",
    rating: 5.0,
  },
  {
    id: "comercial-1",
    name: "Agenda Coleção Comercial",
    description: "4 variantes profissionais",
    price: 70.0,
    image: comercial,
    images: [comercial, comercial1, comercial2, comercial3],
    rating: 4.8,
  },
  {
    id: "candy-1",
    name: "Agenda Coleção Candy",
    description: "2 variantes doces e coloridas",
    price: 70.0,
    image: candy0,
    images: [candy0, candy1],
    tag: "Novo",
    rating: 4.9,
  },
];

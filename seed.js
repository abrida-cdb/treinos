'use strict';
/* Treinos iniciais dos dois perfis (convertidos das páginas publicadas) */
const SEED_PLANS={
"masc": {
"name": "Treino ABCDE · Ganho de massa",
"days": [
{
"id": "A",
"wd": "Segunda",
"title": "Peito e Tríceps",
"focus": "Peitoral nas três porções (superior, médio e inferior) e as três cabeças do tríceps.",
"ex": [
{
"n": "Supino inclinado com barra",
"part": "Peitoral superior (clavicular)",
"sr": "4 × 8–10",
"rest": "90 s",
"pat": "pressincline",
"cues": [
"Banco entre 30° e 45°. Desça a barra até a parte alta do peito, logo abaixo da clavícula.",
"Cotovelos a cerca de 45° do tronco e escápulas presas no banco."
]
},
{
"n": "Supino reto com halteres",
"part": "Peitoral médio (esternal)",
"sr": "4 × 8–10",
"rest": "90 s",
"pat": "pressflat",
"tool": "db",
"cues": [
"Pés firmes no chão e leve arco natural na lombar.",
"Desça até os halteres ficarem na linha do peito e suba aproximando-os."
]
},
{
"n": "Supino declinado com barra",
"part": "Peitoral inferior (abdominal)",
"sr": "3 × 10",
"rest": "90 s",
"pat": "pressdecline",
"cues": [
"Prenda bem as pernas no apoio antes de tirar a barra.",
"Desça a barra até a parte baixa do peito."
]
},
{
"n": "Crossover de cima para baixo",
"part": "Peitoral inferior",
"sr": "3 × 12–15",
"rest": "60 s",
"pat": "crossdown",
"cues": [
"Polias no alto e tronco levemente inclinado à frente.",
"Traga as mãos para baixo e para a frente, até a altura do quadril, e segure 1 s."
]
},
{
"n": "Crossover de baixo para cima",
"part": "Peitoral superior",
"sr": "3 × 12–15",
"rest": "60 s",
"pat": "crossup",
"cues": [
"Polias embaixo, cotovelos levemente flexionados e fixos.",
"Suba as mãos em arco até a altura dos olhos, juntando-as à frente do rosto."
]
},
{
"n": "Tríceps francês com halter",
"part": "Tríceps: cabeça longa",
"sr": "3 × 10–12",
"rest": "60 s",
"pat": "overhead",
"cues": [
"Com o braço acima da cabeça, a cabeça longa trabalha alongada.",
"Cotovelos apontados para cima e parados; só o antebraço se move."
]
},
{
"n": "Tríceps na polia com corda",
"part": "Tríceps: cabeça lateral",
"sr": "3 × 12",
"rest": "60 s",
"pat": "pushdown",
"cues": [
"Cotovelos colados ao corpo.",
"No fim do movimento, abra a corda para os lados e contraia por 1 s."
]
},
{
"n": "Tríceps na polia com pegada invertida",
"part": "Tríceps: cabeça medial",
"sr": "3 × 12–15",
"rest": "60 s",
"pat": "pushdown",
"cues": [
"Barra reta com as palmas viradas para cima.",
"Carga moderada e extensão completa: a cabeça medial trabalha mais no final."
]
}
]
},
{
"id": "B",
"wd": "Terça",
"title": "Costas e Bíceps",
"focus": "Dorsal em largura e espessura, lombar e as três regiões do braço anterior: cabeça longa, cabeça curta e braquial.",
"ex": [
{
"n": "Puxada frontal aberta",
"part": "Grande dorsal (largura)",
"sr": "4 × 10",
"rest": "90 s",
"pat": "pulldown",
"cues": [
"Pegada um pouco mais larga que os ombros, peito para cima.",
"Puxe a barra até a parte alta do peito levando os cotovelos para baixo."
]
},
{
"n": "Remada curvada com barra",
"part": "Romboides, trapézio médio e dorsal (espessura)",
"sr": "4 × 8–10",
"rest": "90 s",
"pat": "row",
"cues": [
"Tronco a cerca de 45°, coluna neutra e joelhos levemente flexionados.",
"Puxe a barra até o umbigo e aproxime as escápulas no topo."
]
},
{
"n": "Remada baixa com triângulo",
"part": "Dorsal central e inferior",
"sr": "3 × 10–12",
"rest": "75 s",
"pat": "seatrow",
"cues": [
"Tronco firme, sem balançar para trás.",
"Leve o triângulo até o abdômen com os cotovelos rentes ao corpo."
]
},
{
"n": "Pulldown com braços estendidos",
"part": "Dorsal inferior",
"sr": "3 × 12–15",
"rest": "60 s",
"pat": "straightarm",
"cues": [
"Braços quase retos o tempo todo; o movimento sai do ombro.",
"Traga a barra em arco até as coxas."
]
},
{
"n": "Hiperextensão lombar",
"part": "Lombar (eretores da espinha)",
"sr": "3 × 15",
"rest": "60 s",
"pat": "hyper",
"cues": [
"Apoio na altura do quadril, para o tronco descer livre.",
"Suba até o corpo ficar em linha reta, sem arquear além disso."
]
},
{
"n": "Rosca inclinada com halteres",
"part": "Bíceps: cabeça longa",
"sr": "3 × 10",
"rest": "60 s",
"pat": "inclinecurl",
"cues": [
"Banco a 45–60°: o braço fica atrás do corpo e alonga a cabeça longa.",
"Cotovelos parados apontando para o chão; desça devagar."
]
},
{
"n": "Rosca Scott",
"part": "Bíceps: cabeça curta",
"sr": "3 × 10–12",
"rest": "60 s",
"pat": "scott",
"cues": [
"Axila encostada no topo do banco; o braço à frente do corpo enfatiza a cabeça curta.",
"Não estenda o cotovelo de forma brusca no final."
]
},
{
"n": "Rosca martelo",
"part": "Braquial e braquiorradial",
"sr": "3 × 12",
"rest": "60 s",
"pat": "curl",
"tool": "db",
"cues": [
"Pegada neutra, palmas viradas uma para a outra.",
"O braquial fica por baixo do bíceps e dá volume à parte inferior do braço."
]
}
]
},
{
"id": "C",
"wd": "Quarta",
"title": "Pernas · Frente",
"focus": "Ênfase no quadríceps, com adutores e sóleo. Faixas de 6 a 15 repetições para hipertrofia, com cargas que preservam os joelhos. Fecha com 1 exercício de peito e 1 de tríceps, 48 h depois do treino A.",
"ex": [
{
"n": "Agachamento livre (ou hack)",
"part": "Quadríceps e glúteos",
"sr": "4 × 6–10",
"rest": "2–3 min",
"pat": "squat",
"cues": [
"Faça 2 a 3 séries de aproximação antes das séries válidas.",
"Desça até a coxa paralela ao chão com a coluna neutra. Se o joelho ou a lombar doerem, troque pelo hack."
]
},
{
"n": "Leg press 45° com pés baixos",
"part": "Quadríceps (vastos)",
"sr": "3 × 10–12",
"rest": "2 min",
"pat": "legpress",
"cues": [
"Pés na metade de baixo da plataforma, na largura do quadril.",
"Desça até os joelhos passarem de 90° sem tirar a lombar do banco e não trave os joelhos no topo."
]
},
{
"n": "Agachamento búlgaro com halteres",
"part": "Quadríceps e glúteos, uma perna por vez",
"sr": "3 × 8–10 cada",
"rest": "90 s",
"pat": "bulgarian",
"cues": [
"Peito do pé de trás apoiado no banco, passo longo à frente.",
"Desça na vertical até o joelho de trás quase tocar o chão. Tronco ereto aumenta o trabalho do quadríceps."
]
},
{
"n": "Cadeira extensora",
"part": "Reto femoral e vastos",
"sr": "3 × 12–15",
"rest": "60 s",
"pat": "extension",
"cues": [
"Encosto ajustado para o joelho ficar no eixo da máquina.",
"Pausa de 1 s com a perna estendida e descida em 3 s. Na última série, reduza 30% da carga e continue (drop-set)."
]
},
{
"n": "Cadeira adutora",
"part": "Adutores (parte interna da coxa)",
"sr": "3 × 12–15",
"rest": "60 s",
"pat": "adduct",
"cues": [
"Comece com uma abertura confortável e aumente aos poucos.",
"Feche as pernas sem impulso e volte devagar."
]
},
{
"n": "Panturrilha sentado",
"part": "Sóleo",
"sr": "4 × 12–15",
"rest": "45 s",
"pat": "calfseat",
"cues": [
"Apoio sobre os joelhos e pontas dos pés no degrau.",
"Alongue bem embaixo por 1 s e suba até a ponta."
]
},
{
"n": "Supino inclinado com halteres",
"part": "Peito: porção superior",
"sr": "3 × 10–12",
"rest": "75 s",
"pat": "pressincline",
"tool": "db",
"cues": [
"Banco a 30°. Carga um pouco abaixo da usada no treino A, para estimular sem acumular fadiga.",
"Desça até alongar o peito e suba em arco, aproximando os halteres no topo."
]
},
{
"n": "Tríceps testa com barra W",
"part": "Tríceps: cabeça longa e medial",
"sr": "3 × 10–12",
"rest": "60 s",
"pat": "skull",
"cues": [
"Braços levemente inclinados para trás da vertical.",
"Desça a barra em direção à testa dobrando só o cotovelo."
]
}
]
},
{
"id": "D",
"wd": "Quinta",
"title": "Ombros, Trapézio e Abdômen",
"focus": "As três porções do deltoide (anterior, lateral e posterior), trapézio e abdômen superior, inferior e oblíquos.",
"ex": [
{
"n": "Desenvolvimento com halteres",
"part": "Deltoide anterior e lateral",
"sr": "4 × 8–10",
"rest": "90 s",
"pat": "press",
"cues": [
"Sentado, costas apoiadas e abdômen firme.",
"Desça os halteres até a linha das orelhas e suba sem bater um no outro."
]
},
{
"n": "Elevação frontal",
"part": "Deltoide anterior",
"sr": "3 × 12",
"rest": "60 s",
"pat": "frontraise",
"cues": [
"Cotovelos levemente flexionados.",
"Suba até a altura dos ombros, sem embalo do tronco."
]
},
{
"n": "Elevação lateral",
"part": "Deltoide lateral",
"sr": "4 × 12–15",
"rest": "60 s",
"pat": "lateral",
"cues": [
"Tronco levemente inclinado à frente; os cotovelos guiam o movimento.",
"Suba até a linha dos ombros, sem encolher o trapézio."
]
},
{
"n": "Crucifixo inverso no peck deck",
"part": "Deltoide posterior",
"sr": "3 × 12–15",
"rest": "60 s",
"pat": "revfly",
"cues": [
"Sentado de frente para a máquina, peito no apoio.",
"Abra os braços em arco até a linha do corpo."
]
},
{
"n": "Encolhimento com halteres",
"part": "Trapézio superior",
"sr": "4 × 12–15",
"rest": "60 s",
"pat": "shrug",
"cues": [
"Braços estendidos ao lado do corpo.",
"Suba os ombros em direção às orelhas e segure 1 s; não gire os ombros."
]
},
{
"n": "Abdominal supra",
"part": "Reto abdominal: porção superior",
"sr": "3 × 15–20",
"rest": "45 s",
"pat": "crunch",
"cues": [
"Mãos atrás da cabeça, sem puxar o pescoço.",
"Tire só as escápulas do chão e solte o ar ao subir."
]
},
{
"n": "Elevação de pernas",
"part": "Reto abdominal: porção inferior",
"sr": "3 × 12–15",
"rest": "45 s",
"pat": "legraise",
"cues": [
"Lombar colada no chão; se ela descolar, flexione os joelhos.",
"Suba as pernas até 90° e desça devagar, sem encostar no chão."
]
},
{
"n": "Lenhador na polia",
"part": "Oblíquos",
"sr": "3 × 12 cada lado",
"rest": "45 s",
"pat": "woodchop",
"cues": [
"Polia alta, braços quase estendidos.",
"Gire o tronco puxando na diagonal de cima para baixo; o quadril acompanha."
]
}
]
},
{
"id": "E",
"wd": "Sexta",
"title": "Pernas · Trás",
"focus": "Posteriores da coxa, glúteos e gastrocnêmio. Começa pelo movimento de quadril (stiff), segue para a flexão do joelho (flexoras) e termina nos glúteos. Fecha com 1 exercício de costas e 1 de bíceps, 72 h depois do treino B.",
"ex": [
{
"n": "Stiff com barra",
"part": "Posteriores da coxa e glúteos",
"sr": "4 × 8–10",
"rest": "2 min",
"pat": "stiff",
"cues": [
"Joelhos levemente flexionados e fixos; o quadril vai para trás.",
"Desça a barra rente às pernas só até onde a coluna continuar reta, em geral pouco abaixo dos joelhos."
]
},
{
"n": "Elevação pélvica com barra",
"part": "Glúteo máximo",
"sr": "4 × 8–12",
"rest": "90 s",
"pat": "hipthrust",
"cues": [
"Escápulas no banco, pés na largura do quadril e almofada na barra.",
"Suba até o tronco alinhar com as coxas, queixo para baixo, e contraia 1 s no topo."
]
},
{
"n": "Mesa flexora",
"part": "Posteriores (bíceps femoral)",
"sr": "3 × 10–12",
"rest": "75 s",
"pat": "legcurl",
"cues": [
"Quadril colado no banco durante toda a série.",
"Traga o calcanhar em direção ao glúteo e desça em 3 s."
]
},
{
"n": "Cadeira flexora",
"part": "Posteriores (semitendinoso e semimembranoso)",
"sr": "3 × 12",
"rest": "60 s",
"pat": "seatcurl",
"cues": [
"Sentado, o quadril flexionado alonga os posteriores e completa a mesa flexora.",
"Trave a coxa no apoio e puxe até onde conseguir, com 1 s de pausa."
]
},
{
"n": "Cadeira abdutora",
"part": "Glúteo médio",
"sr": "3 × 15",
"rest": "45 s",
"pat": "abduct",
"cues": [
"Tronco levemente inclinado à frente aumenta o trabalho do glúteo.",
"Abra as pernas e segure 1 s antes de voltar."
]
},
{
"n": "Hiperextensão com ênfase em glúteo",
"part": "Glúteos e posteriores",
"sr": "3 × 12–15",
"rest": "60 s",
"pat": "hyper",
"cues": [
"Pés virados para fora e costas levemente arredondadas tiram a carga da lombar.",
"Suba contraindo o glúteo até o corpo ficar em linha reta."
]
},
{
"n": "Panturrilha em pé",
"part": "Gastrocnêmio",
"sr": "4 × 10–15",
"rest": "45 s",
"pat": "calf",
"cues": [
"Pontas dos pés no degrau e joelhos estendidos, posição em que o gastrocnêmio trabalha mais.",
"Desça bem e suba até a ponta, com pausa de 1 s no topo."
]
},
{
"n": "Puxada frontal no graviton ou barra fixa",
"part": "Costas: grande dorsal",
"sr": "3 × 8–10",
"rest": "75 s",
"pat": "chinup",
"cues": [
"Escolhido porque não carrega a lombar, que já trabalhou no stiff e na hiperextensão.",
"Puxe até o queixo chegar à barra, levando o peito em direção a ela."
]
},
{
"n": "Rosca direta com barra",
"part": "Bíceps: as duas cabeças",
"sr": "3 × 10",
"rest": "60 s",
"pat": "curl",
"tool": "ez",
"cues": [
"Pegada na largura dos ombros.",
"Cotovelos fixos ao lado do corpo, sem jogar o tronco para trás."
]
}
]
}
]
},
"fem": {
"name": "Força e Core · Glúteos",
"days": [
{
"id": "A",
"wd": "Segunda",
"title": "Glúteos e Quadríceps",
"focus": "Glúteos em primeiro plano, com elevação pélvica logo no início, quando a energia está maior. Core em anti-extensão no fim.",
"cardio": {
"t": "20 min de cardio em zona 2",
"d": "Bicicleta ou esteira inclinada (8–12%), em um ritmo em que você ainda consegue falar frases curtas."
},
"ex": [
{
"n": "Agachamento goblet",
"part": "Quadríceps e glúteos",
"sr": "4 × 10–12",
"rest": "90 s",
"pat": "goblet",
"cues": [
"Segure o halter junto ao peito, com os cotovelos apontando para baixo.",
"Desça entre os joelhos até a coxa ficar paralela ao chão, mantendo o peito aberto."
]
},
{
"n": "Elevação pélvica com barra",
"part": "Glúteo máximo",
"sr": "4 × 10–12",
"rest": "90 s",
"pat": "hipthrust",
"cues": [
"Escápulas no banco, pés na largura do quadril e almofada na barra.",
"Suba até alinhar o tronco com as coxas, queixo para baixo, e contraia o glúteo por 1 s."
]
},
{
"n": "Agachamento búlgaro",
"part": "Glúteos e quadríceps, uma perna por vez",
"sr": "3 × 10 cada",
"rest": "75 s",
"pat": "bulgarian",
"cues": [
"Peito do pé de trás apoiado no banco.",
"Inclinar levemente o tronco à frente aumenta o trabalho do glúteo."
]
},
{
"n": "Cadeira extensora",
"part": "Quadríceps",
"sr": "3 × 12–15",
"rest": "60 s",
"pat": "extension",
"cues": [
"Joelho alinhado ao eixo da máquina.",
"Pausa de 1 s com a perna estendida e descida em 3 s."
]
},
{
"n": "Cadeira abdutora",
"part": "Glúteo médio",
"sr": "3 × 15–20",
"rest": "45 s",
"pat": "abduct",
"cues": [
"Tronco inclinado à frente para focar no glúteo.",
"Abra, segure 1 s e volte devagar."
]
},
{
"n": "Prancha frontal",
"part": "Core: anti-extensão",
"sr": "3 × 30–45 s",
"rest": "45 s",
"pat": "plank",
"cues": [
"Cotovelos sob os ombros, glúteos e abdômen contraídos.",
"Corpo em linha reta da cabeça aos calcanhares: o quadril não cai nem sobe."
]
},
{
"n": "Dead bug",
"part": "Core: anti-extensão e coordenação",
"sr": "3 × 8 cada lado",
"rest": "45 s",
"pat": "deadbug",
"cues": [
"Deitada, braços para cima e joelhos a 90°, com a lombar colada no chão o tempo todo.",
"Estenda devagar um braço e a perna oposta, soltando o ar, e volte."
]
}
]
},
{
"id": "B",
"wd": "Terça",
"title": "Superiores e Core",
"focus": "Costas, peito, ombros e braços, com dois exercícios de core no fim: anti-rotação e anti-flexão lateral.",
"cardio": {
"t": "10 min de intervalado (HIIT)",
"d": "Bicicleta ou remo: 6 rodadas de 30 s forte (esforço 8 de 10) e 60 s leve, com 2 min leves antes e depois."
},
"ex": [
{
"n": "Puxada frontal",
"part": "Costas: grande dorsal",
"sr": "4 × 10–12",
"rest": "75 s",
"pat": "pulldown",
"cues": [
"Pegada um pouco mais larga que os ombros.",
"Puxe a barra até a parte alta do peito levando os cotovelos para baixo."
]
},
{
"n": "Supino inclinado com halteres",
"part": "Peito superior e ombros",
"sr": "3 × 10–12",
"rest": "75 s",
"pat": "pressincline",
"tool": "db",
"cues": [
"Banco a 30° e escápulas presas no banco.",
"Desça até a linha do peito e suba aproximando os halteres."
]
},
{
"n": "Remada baixa com triângulo",
"part": "Costas: espessura",
"sr": "3 × 12",
"rest": "60 s",
"pat": "seatrow",
"cues": [
"Tronco firme, sem balançar para trás.",
"Leve o triângulo até o abdômen e aproxime as escápulas."
]
},
{
"n": "Desenvolvimento com halteres",
"part": "Ombros",
"sr": "3 × 10–12",
"rest": "60 s",
"pat": "press",
"cues": [
"Sentada, com as costas apoiadas e o abdômen firme.",
"Suba os halteres sem arquear a lombar."
]
},
{
"n": "Elevação lateral",
"part": "Deltoide lateral",
"sr": "3 × 12–15",
"rest": "45 s",
"pat": "lateral",
"cues": [
"Cotovelos levemente flexionados guiam o movimento.",
"Suba até a linha dos ombros, sem encolher o pescoço."
]
},
{
"n": "Rosca alternada com halteres",
"part": "Bíceps",
"sr": "3 × 12 cada",
"rest": "45 s",
"pat": "curl",
"tool": "db",
"cues": [
"Cotovelos fixos ao lado do corpo.",
"Gire a palma para cima durante a subida."
]
},
{
"n": "Tríceps na polia com corda",
"part": "Tríceps",
"sr": "3 × 12–15",
"rest": "45 s",
"pat": "pushdown",
"cues": [
"Cotovelos colados ao corpo.",
"No fim do movimento, abra a corda e contraia por 1 s."
]
},
{
"n": "Pallof press",
"part": "Core: anti-rotação",
"sr": "3 × 10 cada lado",
"rest": "45 s",
"pat": "pallof",
"cues": [
"De lado para a polia, com a alça na altura do peito.",
"Empurre as mãos à frente e segure 2 s sem deixar o tronco girar em direção à polia."
]
},
{
"n": "Prancha lateral",
"part": "Core: anti-flexão lateral (oblíquos)",
"sr": "3 × 30 s cada lado",
"rest": "45 s",
"pat": "sideplank",
"cues": [
"Cotovelo sob o ombro e corpo em linha reta.",
"Para facilitar, apoie os joelhos no chão."
]
}
]
},
{
"id": "C",
"wd": "Quarta",
"title": "Glúteos e Posteriores",
"focus": "Glúteos e posteriores da coxa, com core em flexão e rotação no fim.",
"cardio": {
"t": "20 min de cardio em zona 2",
"d": "Bicicleta, elíptico ou esteira inclinada, no mesmo ritmo de segunda-feira."
},
"ex": [
{
"n": "Stiff com halteres",
"part": "Posteriores da coxa e glúteos",
"sr": "4 × 10–12",
"rest": "90 s",
"pat": "stiff",
"tool": "db",
"cues": [
"Joelhos levemente flexionados; o quadril vai para trás.",
"Desça os halteres rente às pernas até onde a coluna continuar reta."
]
},
{
"n": "Step-up com halteres",
"part": "Glúteos e quadríceps",
"sr": "3 × 10 cada perna",
"rest": "60 s",
"pat": "stepup",
"cues": [
"Caixa na altura do joelho, ou mais baixa no começo.",
"Suba empurrando pelo calcanhar da perna de cima, sem impulso da perna de baixo."
]
},
{
"n": "Mesa flexora",
"part": "Posteriores da coxa",
"sr": "3 × 12",
"rest": "60 s",
"pat": "legcurl",
"cues": [
"Quadril colado no banco durante toda a série.",
"Traga o calcanhar em direção ao glúteo e desça em 3 s."
]
},
{
"n": "Afundo reverso com halteres",
"part": "Glúteos e quadríceps",
"sr": "3 × 10 cada perna",
"rest": "60 s",
"pat": "lunge",
"cues": [
"Dê o passo para trás: o afundo reverso carrega menos o joelho que o afundo para a frente.",
"Desça até o joelho de trás quase tocar o chão."
]
},
{
"n": "Hiperextensão com ênfase em glúteo",
"part": "Glúteos e lombar",
"sr": "3 × 15",
"rest": "45 s",
"pat": "hyper",
"cues": [
"Pés virados para fora e costas levemente arredondadas tiram a carga da lombar.",
"Suba contraindo o glúteo até o corpo ficar em linha reta."
]
},
{
"n": "Elevação de pernas",
"part": "Core: abdômen inferior",
"sr": "3 × 12",
"rest": "45 s",
"pat": "legraise",
"cues": [
"Lombar colada no chão; se ela descolar, flexione os joelhos.",
"Desça devagar, sem encostar os pés no chão."
]
},
{
"n": "Lenhador na polia",
"part": "Core: oblíquos (rotação)",
"sr": "3 × 10 cada lado",
"rest": "45 s",
"pat": "woodchop",
"cues": [
"Polia alta e braços quase estendidos.",
"Gire o tronco na diagonal, com o quadril e o pé de trás acompanhando."
]
}
]
},
{
"id": "D",
"wd": "Quinta",
"title": "Core e Condicionamento",
"focus": "Dia com mais core: quatro exercícios, além do swing, que trabalha glúteos e posteriores e eleva a frequência cardíaca.",
"cardio": {
"t": "15 min de caminhada em zona 2",
"d": "Esteira inclinada ou ao ar livre, no fim do treino. Também pode ser uma caminhada mais tarde, no mesmo dia."
},
"ex": [
{
"n": "Swing com kettlebell",
"part": "Glúteos, posteriores e core",
"sr": "4 × 15",
"rest": "60 s",
"pat": "swing",
"cues": [
"A força vem do quadril: leve o quadril para trás e projete-o à frente com energia.",
"Os braços só guiam o kettlebell até a altura do peito."
]
},
{
"n": "Remada unilateral com halter",
"part": "Costas",
"sr": "3 × 12 cada lado",
"rest": "60 s",
"pat": "row",
"tool": "db",
"cues": [
"Joelho e mão do mesmo lado apoiados no banco.",
"Puxe o halter em direção ao quadril, cotovelo rente ao corpo."
]
},
{
"n": "Supino reto com halteres",
"part": "Peito e tríceps",
"sr": "3 × 12",
"rest": "60 s",
"pat": "pressflat",
"tool": "db",
"cues": [
"Pés firmes no chão.",
"Desça até a linha do peito e suba aproximando os halteres."
]
},
{
"n": "Caminhada do fazendeiro",
"part": "Core: anti-flexão lateral e pegada",
"sr": "3 × 30–40 m",
"rest": "60 s",
"pat": "carry",
"cues": [
"Halteres pesados ao lado do corpo, ombros para trás.",
"Passos curtos e tronco imóvel, sem inclinar para os lados."
]
},
{
"n": "Escalador",
"part": "Core e condicionamento",
"sr": "3 × 30 s",
"rest": "45 s",
"pat": "mountain",
"cues": [
"Mãos sob os ombros e quadril alinhado com o corpo.",
"Traga os joelhos ao peito alternando, em um ritmo que mantenha a postura."
]
},
{
"n": "Abdominal supra",
"part": "Core: reto abdominal",
"sr": "3 × 15",
"rest": "45 s",
"pat": "crunch",
"cues": [
"Mãos atrás da cabeça, sem puxar o pescoço.",
"Solte o ar ao subir e tire só as escápulas do chão."
]
},
{
"n": "Prancha frontal",
"part": "Core: anti-extensão",
"sr": "3 × 40–60 s",
"rest": "45 s",
"pat": "plank",
"cues": [
"Tente ficar 10 a 15 s a mais que na segunda-feira.",
"Se a lombar incomodar, apoie os joelhos no chão."
]
}
]
},
{
"id": "E",
"wd": "Sexta",
"title": "Glúteos e Corpo Inteiro",
"focus": "Segunda sessão pesada de glúteos da semana, com costas, ombros e core.",
"cardio": {
"t": "10 min de intervalado (HIIT)",
"d": "Escada, bicicleta ou remo: 6 rodadas de 30 s forte e 60 s leve."
},
"ex": [
{
"n": "Elevação pélvica com barra",
"part": "Glúteo máximo",
"sr": "4 × 8–10",
"rest": "90 s",
"pat": "hipthrust",
"cues": [
"Use mais carga que na segunda-feira, com menos repetições.",
"Contraia o glúteo por 1 s no topo, sem arquear a lombar."
]
},
{
"n": "Agachamento sumô com halter",
"part": "Glúteos, adutores e quadríceps",
"sr": "3 × 12",
"rest": "75 s",
"pat": "goblet",
"cues": [
"Pés mais afastados que os ombros, com as pontas para fora.",
"Halter junto ao peito; desça com os joelhos na direção dos pés."
]
},
{
"n": "Barra fixa no graviton",
"part": "Costas: grande dorsal",
"sr": "3 × 10",
"rest": "75 s",
"pat": "chinup",
"cues": [
"Ajuste o contrapeso para completar as repetições com boa técnica.",
"Puxe até o queixo chegar à barra, levando o peito em direção a ela."
]
},
{
"n": "Cadeira flexora",
"part": "Posteriores da coxa",
"sr": "3 × 12",
"rest": "60 s",
"pat": "seatcurl",
"cues": [
"Trave a coxa no apoio, joelho alinhado ao eixo da máquina.",
"Puxe o calcanhar para baixo e para trás e volte em 3 s."
]
},
{
"n": "Crucifixo inverso no peck deck",
"part": "Ombros posteriores e postura",
"sr": "3 × 15",
"rest": "45 s",
"pat": "revfly",
"cues": [
"Peito no apoio da máquina.",
"Abra os braços até a linha do corpo, aproximando as escápulas."
]
},
{
"n": "Cadeira abdutora",
"part": "Glúteo médio",
"sr": "3 × 20",
"rest": "45 s",
"pat": "abduct",
"cues": [
"Tronco inclinado à frente.",
"Nas últimas 5 repetições, segure 2 s com as pernas abertas."
]
},
{
"n": "Pallof press",
"part": "Core: anti-rotação",
"sr": "3 × 10 cada lado",
"rest": "45 s",
"pat": "pallof",
"cues": [
"De lado para a polia.",
"Segure 2 s com os braços estendidos sem deixar o tronco girar."
]
},
{
"n": "Prancha lateral",
"part": "Core: anti-flexão lateral (oblíquos)",
"sr": "3 × 30–40 s cada lado",
"rest": "45 s",
"pat": "sideplank",
"cues": [
"Cotovelo sob o ombro e corpo em linha reta.",
"Tente ficar 5 a 10 s a mais que na terça-feira."
]
}
]
}
]
}
};

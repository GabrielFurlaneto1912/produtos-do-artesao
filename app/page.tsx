
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

/* =========================================================
   TIPOS
========================================================= */

type Categoria =
    | "Decoração"
    | "Pinturas"
    | "Crochê"
    | "Colecionáveis"
    | "Presentes";

type Produto = {
    id: number;
    nome: string;
    categoria: Categoria;
    descricao: string;
    preco: number;
    imagem: string;
};

type Carrinho = Record<number, number>;

type ItemCarrinho = {
    produto: Produto;
    qtd: number;
};

const CHAVE_CARRINHO = "carrinho-produtos-do-artesao";
const FRETE_GRATIS_A_PARTIR = 199;
const VALOR_FRETE = 19.9;
const DESCONTO_PIX = 0.05;

const formatarPreco = (valor: number) =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

/* =========================================================
   CATEGORIAS
========================================================= */

const categorias = [
    {
        nome: "Decoração",
        descricao: "Arte para transformar ambientes",
        simbolo: "✧",
    },
    {
        nome: "Pinturas",
        descricao: "Quadros pintados à mão",
        simbolo: "❖",
    },
    {
        nome: "Crochê",
        descricao: "Peças tecidas ponto a ponto",
        simbolo: "◇",
    },
    {
        nome: "Colecionáveis",
        descricao: "Funkos e personagens artesanais",
        simbolo: "✦",
    },
    {
        nome: "Presentes",
        descricao: "Presentes únicos e especiais",
        simbolo: "❀",
    },
];

/* =========================================================
   PRODUTOS
========================================================= */

const produtos: Produto[] = [
    // COLOQUE AQUI SEUS PRODUTOS ANTERIORES (1 a 11)

    // COLECIONÁVEIS
    { id: 1012, nome: "Funko Artesanal 1", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko1.jpeg" },
    { id: 1013, nome: "Funko Artesanal 2", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko2.jpeg" },
    { id: 1014, nome: "Funko Artesanal 3", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko3.jpeg" },
    { id: 1015, nome: "Funko Artesanal 4", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko4.jpeg" },
    { id: 1016, nome: "Funko Artesanal 5", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko5.jpeg" },
    { id: 1017, nome: "Funko Artesanal 6", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko6.jpeg" },
    { id: 1018, nome: "Funko Artesanal 7", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko7.jpeg" },
    { id: 1019, nome: "Funko Artesanal 8", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko8.jpeg" },
    { id: 1020, nome: "Funko Artesanal 9", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko9.jpeg" },
    { id: 1021, nome: "Funko Artesanal 10", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko10.jpeg" },
    { id: 1022, nome: "Funko Artesanal 12", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko12.jpeg" },
    { id: 1023, nome: "Funko Artesanal 13", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko13.jpeg" },
    { id: 1024, nome: "Funko Artesanal 14", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko14.jpeg" },
    { id: 1025, nome: "Funko Artesanal 15", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko15.jpeg" },
    { id: 1026, nome: "Funko Artesanal 16", categoria: "Colecionáveis", descricao: "Boneco personalizado feito à mão", preco: 79.9, imagem: "/funko16.jpeg" },
    { id: 1027, nome: "Pokémon Artesanal I", categoria: "Colecionáveis", descricao: "Personagem feito à mão", preco: 74.9, imagem: "/pokemon1.jpeg" },
    { id: 1028, nome: "Pokémon Artesanal II", categoria: "Colecionáveis", descricao: "Personagem feito à mão", preco: 74.9, imagem: "/pokemon2.jpeg" },
    { id: 1029, nome: "Miraculous Artesanal", categoria: "Colecionáveis", descricao: "Personagem feito à mão", preco: 74.9, imagem: "/miraculous1.jpeg" },
    // DECORAÇÃO
    { id: 1030, nome: "Buquê Artesanal I", categoria: "Decoração", descricao: "Peça artesanal decorativa", preco: 59.9, imagem: "/bule1.jpeg" },
    { id: 1031, nome: "Buquê Artesanal II", categoria: "Decoração", descricao: "Peça artesanal decorativa", preco: 59.9, imagem: "/bule2.jpeg" },
    { id: 1032, nome: "Casa Artesanal", categoria: "Decoração", descricao: "Peça decorativa feita à mão", preco: 89.9, imagem: "/casa1.jpeg" },
    { id: 1033, nome: "Jogo de Jantar Artesanal", categoria: "Decoração", descricao: "Conjunto artesanal para decoração e mesa", preco: 129.9, imagem: "/jogojantar1.jpeg" },
    { id: 1034, nome: "Caixa de Música Artesanal", categoria: "Presentes", descricao: "Peça especial feita à mão", preco: 99.9, imagem: "/musicbox.jpeg" },

    // CROCHÊ
    { id: 1035, nome: "Crochê Artesanal I", categoria: "Crochê", descricao: "Peça confeccionada artesanalmente", preco: 49.9, imagem: "/croche1.jpeg" },
    { id: 1036, nome: "Crochê Artesanal II", categoria: "Crochê", descricao: "Peça confeccionada artesanalmente", preco: 49.9, imagem: "/croche2.jpeg" },
    { id: 1037, nome: "Crochê Artesanal III", categoria: "Crochê", descricao: "Peça confeccionada artesanalmente", preco: 49.9, imagem: "/croche3.jpeg" },

    // PINTURAS
    { id: 1038, nome: "Pintura Artesanal I", categoria: "Pinturas", descricao: "Obra artística pintada à mão", preco: 89.9, imagem: "/pintura1.jpeg" },
    { id: 1039, nome: "Pintura Artesanal II", categoria: "Pinturas", descricao: "Obra artística pintada à mão", preco: 89.9, imagem: "/pintura%202.jpeg" },
    { id: 1040, nome: "Pintura Artesanal III", categoria: "Pinturas", descricao: "Obra artística pintada à mão", preco: 89.9, imagem: "/pintura3.jpeg" },
    { id: 1041, nome: "Pintura Artesanal IV", categoria: "Pinturas", descricao: "Obra artística pintada à mão", preco: 89.9, imagem: "/pintura4.jpeg" },

    // PRESENTES
    { id: 1042, nome: "Livro Artesanal", categoria: "Presentes", descricao: "Produto artesanal especial", preco: 69.9, imagem: "/livro1.jpeg" },
];
/* =========================================================
   CARROSSEL
========================================================= */

const promocoes = [
    { imagem: "/promo1.png", alt: "Promoção 1" },
    { imagem: "/promo2.png", alt: "Promoção 2" },
    { imagem: "/promo3.png", alt: "Promoção 3" },
    { imagem: "/promo4.png", alt: "Promoção 4" },
];

function Carrossel({
    irPara,
}: {
    irPara: (secao: string) => void;
}) {
    const [atual, setAtual] = useState(0);
    const [pausado, setPausado] = useState(false);

    useEffect(() => {
        if (pausado) return;

        const intervalo = setInterval(() => {
            setAtual((i) => (i + 1) % promocoes.length);
        }, 5000);

        return () => clearInterval(intervalo);
    }, [pausado]);

    const anterior = () => {
        setAtual((i) => (i - 1 + promocoes.length) % promocoes.length);
    };

    const proximo = () => {
        setAtual((i) => (i + 1) % promocoes.length);
    };

    return (
        <div
            className="carousel slide"
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
        >
            <div className="carousel-indicators">
                {promocoes.map((promo, i) => (
                    <button
                        key={promo.imagem}
                        type="button"
                        className={i === atual ? "active" : ""}
                        aria-label={`Slide ${i + 1}`}
                        aria-current={i === atual}
                        onClick={() => setAtual(i)}
                    />
                ))}
            </div>

            <div
                className="carousel-inner"
                style={{
                    transform: `translateX(-${atual * 100}%)`,
                }}
            >
                {promocoes.map((promo, i) => (
                    <div
                        className={`carousel-item ${i === atual ? "active" : ""}`}
                        key={promo.imagem}
                        aria-hidden={i !== atual}
                    >
                        <img
                            src={promo.imagem}
                            className="d-block w-100"
                            alt={promo.alt}
                            onClick={() => irPara("produtos")}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                ))}
            </div>

            <button
                className="carousel-control-prev"
                type="button"
                onClick={anterior}
                aria-label="Promoção anterior"
            >
                <span className="carousel-control-prev-icon" />
            </button>

            <button
                className="carousel-control-next"
                type="button"
                onClick={proximo}
                aria-label="Próxima promoção"
            >
                <span className="carousel-control-next-icon" />
            </button>
        </div>
    );
}

/* =========================================================
   CABEÇALHO
========================================================= */

function Cabecalho({
    totalItens,
    abrirCarrinho,
    irPara,
}: {
    totalItens: number;
    abrirCarrinho: () => void;
    irPara: (secao: string) => void;
}) {
    const links = [
        { nome: "Início", secao: "topo" },
        { nome: "Categorias", secao: "categorias" },
        { nome: "Produtos", secao: "produtos" },
        { nome: "Sobre nós", secao: "sobre" },
        { nome: "Contato", secao: "contato" },
    ];

    return (
        <header>
            <nav className="navbar container">
                <a
                    href="#topo"
                    className="logo"
                    onClick={(e) => {
                        e.preventDefault();
                        irPara("topo");
                    }}
                >
                    <img src="/logo.jpeg" alt="Produtos do Artesão" />
                </a>

                <ul className="nav-links">
                    {links.map((link) => (
                        <li key={link.secao}>
                            <a
                                href={`#${link.secao}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    irPara(link.secao);
                                }}
                            >
                                {link.nome}
                            </a>
                        </li>
                    ))}
                </ul>

                <button
                    type="button"
                    className="btn cart-btn"
                    onClick={abrirCarrinho}
                >
                    🛒 Carrinho

                    {totalItens > 0 && (
                        <span className="cart-count">{totalItens}</span>
                    )}
                </button>
            </nav>
        </header>
    );
}

/* =========================================================
   CARD DE PRODUTO
========================================================= */

function CardProduto({
    produto,
    noCarrinho,
    adicionar,
}: {
    produto: Produto;
    noCarrinho: number;
    adicionar: (id: number, qtd: number) => void;
}) {
    const [qtd, setQtd] = useState(1);
    const [adicionado, setAdicionado] = useState(false);

    const handleAdicionar = () => {
        adicionar(produto.id, qtd);
        setQtd(1);
        setAdicionado(true);

        setTimeout(() => {
            setAdicionado(false);
        }, 1500);
    };

    return (
        <article className="product-card">
            <div className="product-img">
                <img
                    src={produto.imagem}
                    alt={produto.nome}
                    loading="lazy"
                />

                <span className="product-tag">
                    {produto.categoria}
                </span>

                {noCarrinho > 0 && (
                    <span className="product-in-cart">
                        🛒 {noCarrinho}
                    </span>
                )}
            </div>

            <h3>{produto.nome}</h3>

            <p className="product-desc">{produto.descricao}</p>

            <span className="product-price">
                {formatarPreco(produto.preco)}
            </span>

            <small className="product-parcel">
                ou 3x de {formatarPreco(produto.preco / 3)} sem juros
            </small>

            <div className="add-row">
                <div className="qty-selector">
                    <button
                        type="button"
                        onClick={() => setQtd((q) => Math.max(1, q - 1))}
                        aria-label="Diminuir quantidade"
                    >
                        −
                    </button>

                    <span>{qtd}</span>

                    <button
                        type="button"
                        onClick={() => setQtd((q) => Math.min(99, q + 1))}
                        aria-label="Aumentar quantidade"
                    >
                        +
                    </button>
                </div>

                <button
                    type="button"
                    className={`btn add-btn ${adicionado ? "added" : ""}`}
                    onClick={handleAdicionar}
                >
                    {adicionado ? "✓ Adicionado!" : "Adicionar"}
                </button>
            </div>
        </article>
    );
}

/* =========================================================
   TELA DO CARRINHO
========================================================= */

function TelaCarrinho({
    itens,
    alterarQtd,
    limpar,
    voltar,
}: {
    itens: ItemCarrinho[];
    alterarQtd: (id: number, qtd: number) => void;
    limpar: () => void;
    voltar: () => void;
}) {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [endereco, setEndereco] = useState("");
    const [pagamento, setPagamento] = useState("Pix");

    const [pedido, setPedido] = useState<{
        numero: number;
        total: number;
    } | null>(null);

    const totalItens = itens.reduce((soma, item) => soma + item.qtd, 0);

    const subtotal = itens.reduce(
        (soma, item) => soma + item.qtd * item.produto.preco,
        0
    );

    const frete =
        subtotal === 0 || subtotal >= FRETE_GRATIS_A_PARTIR
            ? 0
            : VALOR_FRETE;

    const desconto =
        pagamento === "Pix" ? subtotal * DESCONTO_PIX : 0;

    const total = subtotal + frete - desconto;

    const faltaFreteGratis = Math.max(
        0,
        FRETE_GRATIS_A_PARTIR - subtotal
    );

    const finalizar = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (itens.length === 0) return;

        setPedido({
            numero: Math.floor(100000 + Math.random() * 900000),
            total,
        });

        limpar();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (pedido) {
        return (
            <section className="cart-page">
                <div className="container cart-done">
                    <div className="cart-done-icon">✓</div>

                    <h1>Pedido confirmado!</h1>

                    <div className="gold-line" />

                    <p>
                        Obrigado, {nome.split(" ")[0]}! Seu pedido{" "}
                        <strong>#{pedido.numero}</strong> foi recebido.
                    </p>

                    <p>
                        Total: <strong>{formatarPreco(pedido.total)}</strong>
                        {" "}• Pagamento via {pagamento}
                    </p>

                    <p>
                        Entraremos em contato pelo telefone {telefone} para
                        combinar a entrega.
                    </p>

                    <p>Endereço informado: {endereco}</p>

                    <button
                        className="btn"
                        style={{ marginTop: "25px" }}
                        onClick={voltar}
                    >
                        Voltar para a loja
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="cart-page">
            <div className="container">
                <div className="section-title">
                    <h2>Seu Carrinho</h2>
                    <div className="gold-line" />

                    <p>
                        {totalItens === 0
                            ? "Nenhum produto por aqui ainda."
                            : `${totalItens} ${totalItens === 1 ? "item" : "itens"} no carrinho`}
                    </p>
                </div>

                {itens.length === 0 ? (
                    <div className="cart-empty-page">
                        <div className="cart-empty-icon">🛒</div>

                        <p>
                            Seu carrinho está vazio. Que tal conhecer nossas
                            peças artesanais?
                        </p>

                        <button className="btn" onClick={voltar}>
                            Ver produtos
                        </button>
                    </div>
                ) : (
                    <div className="cart-layout">
                        <div className="cart-items">
                            {itens.map(({ produto, qtd }) => (
                                <div className="cart-item" key={produto.id}>
                                    <img src={produto.imagem} alt={produto.nome} />

                                    <div className="cart-item-info">
                                        <span className="cart-item-cat">
                                            {produto.categoria}
                                        </span>

                                        <h3>{produto.nome}</h3>

                                        <span className="cart-item-unit">
                                            {formatarPreco(produto.preco)} cada
                                        </span>
                                    </div>

                                    <div className="qty-selector">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                alterarQtd(produto.id, qtd - 1)
                                            }
                                            aria-label="Diminuir quantidade"
                                        >
                                            −
                                        </button>

                                        <span>{qtd}</span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                alterarQtd(produto.id, qtd + 1)
                                            }
                                            aria-label="Aumentar quantidade"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <strong className="cart-item-total">
                                        {formatarPreco(produto.preco * qtd)}
                                    </strong>

                                    <button
                                        type="button"
                                        className="cart-item-remove"
                                        onClick={() => alterarQtd(produto.id, 0)}
                                        aria-label={`Remover ${produto.nome}`}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            <div className="cart-actions">
                                <button
                                    className="btn btn-outline"
                                    onClick={voltar}
                                >
                                    ← Continuar comprando
                                </button>

                                <button
                                    className="btn btn-outline"
                                    onClick={limpar}
                                >
                                    Esvaziar carrinho
                                </button>
                            </div>
                        </div>

                        <aside className="cart-summary">
                            <h3>Resumo do pedido</h3>

                            {faltaFreteGratis > 0 ? (
                                <p className="free-shipping">
                                    Faltam{" "}
                                    <strong>{formatarPreco(faltaFreteGratis)}</strong>
                                    {" "}para frete grátis!

                                    <span className="free-bar">
                                        <span
                                            style={{
                                                width: `${Math.min(
                                                    (subtotal / FRETE_GRATIS_A_PARTIR) * 100,
                                                    100
                                                )}%`,
                                            }}
                                        />
                                    </span>
                                </p>
                            ) : (
                                <p className="free-shipping ok">
                                    🎉 Você ganhou frete grátis!
                                </p>
                            )}

                            <div className="summary-line">
                                <span>Subtotal</span>
                                <span>{formatarPreco(subtotal)}</span>
                            </div>

                            <div className="summary-line">
                                <span>Frete</span>
                                <span>
                                    {frete === 0 ? "Grátis" : formatarPreco(frete)}
                                </span>
                            </div>

                            {desconto > 0 && (
                                <div className="summary-line discount">
                                    <span>Desconto Pix (5%)</span>
                                    <span>− {formatarPreco(desconto)}</span>
                                </div>
                            )}

                            <div className="summary-line total">
                                <span>Total</span>
                                <strong>{formatarPreco(total)}</strong>
                            </div>

                            <form className="checkout-form" onSubmit={finalizar}>
                                <h4>Dados para entrega</h4>

                                <input
                                    type="text"
                                    placeholder="Nome completo"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                />

                                <input
                                    type="tel"
                                    placeholder="Telefone / WhatsApp"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    required
                                />

                                <textarea
                                    placeholder="Endereço completo"
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                    rows={3}
                                    required
                                />

                                <h4>Forma de pagamento</h4>

                                <div className="payment-options">
                                    {["Pix", "Cartão", "Boleto"].map((op) => (
                                        <label
                                            key={op}
                                            className={pagamento === op ? "active" : ""}
                                        >
                                            <input
                                                type="radio"
                                                name="pagamento"
                                                value={op}
                                                checked={pagamento === op}
                                                onChange={() => setPagamento(op)}
                                            />
                                            {op}
                                        </label>
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    className="btn"
                                    style={{ width: "100%" }}
                                >
                                    Finalizar compra • {formatarPreco(total)}
                                </button>
                            </form>
                        </aside>
                    </div>
                )}
            </div>
        </section>
    );
}

/* =========================================================
   PÁGINA PRINCIPAL
========================================================= */

export default function Home() {
    const [filtro, setFiltro] = useState("Todos");
    const [carrinho, setCarrinho] = useState<Carrinho>({});
    const [carregado, setCarregado] = useState(false);

    const [tela, setTela] = useState<"loja" | "carrinho">("loja");
    const [aviso, setAviso] = useState<string | null>(null);

    // Recupera o carrinho salvo no navegador.
    useEffect(() => {
        try {
            const salvo = localStorage.getItem(CHAVE_CARRINHO);

            if (salvo) {
                const dados = JSON.parse(salvo);

                if (dados && typeof dados === "object" && !Array.isArray(dados)) {
                    const valido: Carrinho = {};

                    for (const [id, qtd] of Object.entries(dados)) {
                        const numeroId = Number(id);
                        const quantidade = Number(qtd);

                        if (
                            produtos.some((produto) => produto.id === numeroId) &&
                            Number.isInteger(quantidade) &&
                            quantidade > 0
                        ) {
                            valido[numeroId] = Math.min(quantidade, 99);
                        }
                    }

                    setCarrinho(valido);
                }
            }
        } catch {
            console.error("Não foi possível recuperar o carrinho salvo.");
        }

        setCarregado(true);

        const verificarEndereco = () => {
            setTela(
                window.location.hash === "#carrinho"
                    ? "carrinho"
                    : "loja"
            );
        };

        verificarEndereco();

        window.addEventListener("popstate", verificarEndereco);

        return () => {
            window.removeEventListener("popstate", verificarEndereco);
        };
    }, []);

    // Salva o carrinho sempre que ele muda.
    useEffect(() => {
        if (!carregado) return;

        try {
            localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
        } catch {
            console.error("Não foi possível salvar o carrinho.");
        }
    }, [carrinho, carregado]);

    // Esconde o aviso após alguns segundos.
    useEffect(() => {
        if (!aviso) return;

        const intervalo = setTimeout(() => {
            setAviso(null);
        }, 2500);

        return () => clearTimeout(intervalo);
    }, [aviso]);

    const itens: ItemCarrinho[] = Object.entries(carrinho)
        .map(([id, qtd]) => ({
            produto: produtos.find((p) => p.id === Number(id))!,
            qtd,
        }))
        .filter((item) => item.produto && item.qtd > 0);

    const totalItens = itens.reduce(
        (soma, item) => soma + item.qtd,
        0
    );

    const adicionar = (id: number, qtd: number) => {
        const produto = produtos.find((p) => p.id === id);

        if (!produto) return;

        setCarrinho((atual) => ({
            ...atual,
            [id]: Math.min((atual[id] || 0) + qtd, 99),
        }));

        setAviso(`${qtd}x ${produto.nome} adicionado ao carrinho`);
    };

    const alterarQtd = (id: number, qtd: number) => {
        setCarrinho((atual) => {
            const novo = { ...atual };

            if (qtd <= 0) {
                delete novo[id];
            } else {
                novo[id] = Math.min(qtd, 99);
            }

            return novo;
        });
    };

    const limpar = () => {
        setCarrinho({});
    };

    const abrirCarrinho = () => {
        window.history.pushState(null, "", "#carrinho");
        setTela("carrinho");
        setAviso(null);

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const irPara = (secao: string) => {
        if (tela === "carrinho") {
            window.history.pushState(
                null,
                "",
                secao === "topo" ? "/" : `/#${secao}`
            );
        }

        setTela("loja");

        setTimeout(() => {
            if (secao === "topo") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                document
                    .getElementById(secao)
                    ?.scrollIntoView({ behavior: "smooth" });
            }
        }, 50);
    };

    const escolherCategoria = (nome: string) => {
        setFiltro(nome);
        irPara("produtos");
    };

    const produtosFiltrados =
        filtro === "Todos"
            ? produtos
            : produtos.filter((p) => p.categoria === filtro);

    return (
        <main>
            <Cabecalho
                totalItens={totalItens}
                abrirCarrinho={abrirCarrinho}
                irPara={irPara}
            />

            {tela === "carrinho" ? (
                <TelaCarrinho
                    itens={itens}
                    alterarQtd={alterarQtd}
                    limpar={limpar}
                    voltar={() => irPara("produtos")}
                />
            ) : (
                <>
                    {/* BANNER PRINCIPAL */}
                    <section className="hero" id="topo">
                        <div className="hero-content">
                            <p>TRADIÇÃO • CRIATIVIDADE • ORIGINALIDADE</p>

                            <h1>
                                Produtos do
                                <br />
                                Artesão
                            </h1>

                            <div className="gold-line" />

                            <p>
                                Descubra a beleza do trabalho artesanal.
                                <br />
                                Produtos únicos, criados com dedicação,
                                talento e criatividade.
                            </p>

                            <button
                                className="btn"
                                onClick={() => irPara("produtos")}
                            >
                                Comprar agora
                            </button>
                        </div>
                    </section>

                    {/* CARROSSEL */}
                    <Carrossel irPara={irPara} />

                    {/* CATEGORIAS */}
                    <section className="section" id="categorias">
                        <div className="container">
                            <div className="section-title">
                                <h2>Nossas Categorias</h2>
                                <div className="gold-line" />
                                <p>
                                    Explore diferentes formas de arte e criatividade.
                                </p>
                            </div>

                            <div className="products-grid">
                                {categorias.map((categoria) => (
                                    <div
                                        className="category-card"
                                        key={categoria.nome}
                                    >
                                        <div className="category-symbol">
                                            {categoria.simbolo}
                                        </div>

                                        <h3>{categoria.nome}</h3>
                                        <p>{categoria.descricao}</p>

                                        <button
                                            type="button"
                                            className="btn btn-outline"
                                            style={{ marginTop: "20px" }}
                                            onClick={() =>
                                                escolherCategoria(categoria.nome)
                                            }
                                        >
                                            Explorar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* LOJA */}
                    <section className="section" id="produtos">
                        <div className="container">
                            <div className="section-title">
                                <h2>Nossa Loja</h2>
                                <div className="gold-line" />

                                <p>
                                    Criações especiais de nossos artesãos —{" "}
                                    {produtos.length} peças disponíveis.
                                </p>
                            </div>

                            <div className="filters">
                                {["Todos", ...categorias.map((c) => c.nome)].map(
                                    (nome) => (
                                        <button
                                            key={nome}
                                            type="button"
                                            className={`filter-btn ${filtro === nome ? "active" : ""
                                                }`}
                                            onClick={() => setFiltro(nome)}
                                        >
                                            {nome}
                                        </button>
                                    )
                                )}
                            </div>

                            <div className="products-grid">
                                {produtosFiltrados.map((produto) => (
                                    <CardProduto
                                        key={produto.id}
                                        produto={produto}
                                        noCarrinho={carrinho[produto.id] || 0}
                                        adicionar={adicionar}
                                    />
                                ))}
                            </div>

                            {produtosFiltrados.length === 0 && (
                                <p className="empty-message">
                                    Nenhum produto encontrado nesta categoria.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* SOBRE */}
                    <section className="section" id="sobre">
                        <div className="container">
                            <div className="section-title">
                                <h2>A Arte de Criar</h2>
                                <div className="gold-line" />
                            </div>

                            <div className="about-text">
                                <p>
                                    O Produtos do Artesão nasceu com o propósito de
                                    valorizar a criatividade, o talento e a dedicação
                                    de quem transforma ideias em peças únicas.

                                    <br />
                                    <br />

                                    Acreditamos que cada produto artesanal carrega
                                    uma história, uma identidade e o cuidado de quem
                                    o criou.

                                    <br />
                                    <br />

                                    Nosso objetivo é aproximar artesãos e consumidores,
                                    proporcionando um espaço para descobrir, apreciar
                                    e valorizar a arte feita à mão.
                                </p>
                            </div>

                            <div className="benefits">
                                <div>
                                    <strong>🚚 Frete grátis</strong>
                                    <span>acima de R$ 199</span>
                                </div>

                                <div>
                                    <strong>🔒 Compra segura</strong>
                                    <span>Pix, cartão e boleto</span>
                                </div>

                                <div>
                                    <strong>🎁 Embalagem presente</strong>
                                    <span>em todos os pedidos</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CHAMADA PARA ARTESÃOS */}
                    <section className="hero">
                        <div className="hero-content">
                            <h1>Você é artesão?</h1>
                            <div className="gold-line" />

                            <p>
                                Mostre ao mundo sua criatividade.
                                <br />
                                Venda suas criações e dê mais visibilidade ao seu trabalho.
                            </p>

                            <button
                                className="btn"
                                onClick={() => irPara("contato")}
                            >
                                Quero vender
                            </button>
                        </div>
                    </section>
                </>
            )}

            {/* RODAPÉ */}
            <footer id="contato">
                <div className="container">
                    <h2>Produtos do Artesão</h2>
                    <div className="gold-line" />

                    <p>
                        Valorizando a arte, a criatividade e o trabalho artesanal.
                    </p>

                    <p>
                        contato@produtosdoartesao.com • (11) 99999-9999
                    </p>

                    <p>
                        Início | Categorias | Produtos | Sobre nós | Contato
                    </p>

                    <p style={{ marginTop: "35px" }}>
                        © 2026 Produtos do Artesão. Todos os direitos reservados.
                    </p>
                </div>
            </footer>

            {/* AVISO DE PRODUTO ADICIONADO */}
            {aviso && (
                <div className="toast">
                    <span>✓ {aviso}</span>

                    <button type="button" onClick={abrirCarrinho}>
                        Ver carrinho
                    </button>
                </div>
            )}
        </main>
    );
}

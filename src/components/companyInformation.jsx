import React, { Component } from "react";
import "../styles/companyInformation.css";

class CompanyInformation extends Component {
  state = {
    isExtraInformationVisible: false
  };

  handleDisplayChange() {
    this.setState({
      isExtraInformationVisible: !this.state.isExtraInformationVisible
    });
  }

  render() {
    const { companyName } = this.props;

    return (
      <div className="companyInformationBlock pageBlock withShadow">
        <h2 className="header boldText">О компании {companyName}</h2>
        <ul className="resumeList">
          <li className="resumeItem">
            <img className="photo" src="/images/photo-1.jpg" alt="Интерьер" />
            <p className="caption">Диагностика авто</p>
            <p className="price">От 1.000 рублей</p>
          </li>
          <li className="resumeItem">
            <img className="photo" src="/images/photo-2.jpg" alt="Интерьер" />
            <p className="caption">Увеличение мощности</p>
            <p className="price">От 2.000 рублей</p>
          </li>
          <li className="resumeItem">
            <img className="photo" src="/images/photo-3.jpg" alt="Интерьер" />
            <p className="caption">Удаление DPF</p>
            <p className="price">
              От 1.500 рублей <span className="red">сидка -5%</span>
            </p>
          </li>
        </ul>
        <div className="textContent">
          Чип-тюнинг — это изменение программы управления двигателя, благодаря
          чему можно достигнуть новых характеристик в мощности, плавности хода и
          экономичности, без технического воздействия на узлы двигателя.
        </div>
        {!this.state.isExtraInformationVisible && (
          <button
            className="extraInformationButton darkgoldenrodText"
            onClick={() => this.handleDisplayChange()}
          >
            Показать все
          </button>
        )}
        {this.state.isExtraInformationVisible && (
          <section className="extraInformation animated changeOpacity">
            <p>
              Как уже упоминалось выше, наиболее часто преследуемая цель —
              повышение мощности двигателей автомобилей. Сейчас в связи с
              подорожанием топлива к чип-тюнингу все чаще обращаются для
              снижения расхода топлива. Иногда — для коррекции программы блока
              управления двигателем в связи с изменением режима работы,
              параметров или комплектации механических и/или электронных
              компонентов двигателя автомобиля. Например, это может быть замена
              форсунок на другие, с отличающейся производительностью, установка
              нагнетателя воздуха, переход на другой вид топлива и др.
              Чип-тюнинг необходим для большинства автомобилей при установке на
              них ГБО (газобалонного оборудования), так как оптимальный УОЗ
              (угол опережения зажигания) для газового топлива существенно
              отличается от такового для бензина, а корректировка УОЗ возможна
              только при изменении калибровок программы управления двигателем.
            </p>
            <p>
              Следует также отметить, что в России одним из важных направлений
              применения чип-тюнинга, в особенности в сегменте массовых
              недорогих автомобилей, стало исправление заводских ошибок в
              программах, допускаемых рядом производителей при выходе на
              российский рынок. Большинство производителей устанавливает в ЭБУ
              (электронный блок управления) автомобиля "усредненные" программы,
              не учитывающие особенности российского топлива, климатические
              особенности региона и т.д., а также перевод авто на нормы
              токсичности евро 2 и ниже, в связи с частыми выходами из строя
              датчиков кислорода и потерей свойств каталитических
              нейтрализаторов. В результате на заводских программах наблюдаются
              ставшие уже классическими проблемы, например: рывки при переходе
              от холостого хода к движению на большинстве автомобилей Daewoo
              Nexia, неконтролируемый подскок оборотов холостого хода на
              автомобилях Chevrolet Lanos, неустойчивый холостой ход на
              автомобилях ZAZ Sens и многое другое. Указанные проблемы могут
              быть успешно устранены при помощи чип-тюнинга.
            </p>
            <button
              className="extraInformationHideButton darkgoldenrodText"
              onClick={() => this.handleDisplayChange()}
            >
              Скрыть дополнительную информацию
            </button>
          </section>
        )}
      </div>
    );
  }
}

export default CompanyInformation;

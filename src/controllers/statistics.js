import { render } from "../components/utils";
import { Statistics } from "../components/statistics";
import { main } from "../main";
import flatpickr from "flatpickr";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export class StatisticsController {
  constructor(cards) {
    this._cards = cards;
    this._statistics = new Statistics();
  }

  _renderStatistics() {
    render(main, this._statistics.getElement());
    this._renderCharts();
    this._statistics.getElement().classList.add(`visually-hidden`);

    const week = {
      first: `first`,
      last: `last`,
    };

    /* eslint-disable */

    const defaultRangeDate = (dayWeek) => {
      const day = new Date().getDay();
      const diff =
        new Date().getDate() -
        day +
        (day == 0
          ? dayWeek === week.first
            ? -6
            : +3
          : dayWeek === week.first
          ? 1
          : 7);

      const foundDay = new Date(new Date().setDate(diff));
      return `${foundDay.getFullYear()}:${
        foundDay.getUTCMonth() + 1
      }:${foundDay.getDate()}`;
    };

    flatpickr(
      this._statistics.getElement().querySelector(`.statistic__period-input`),
      {
        altInput: true,
        allowInput: true,
        mode: "range",
        dateFormat: "Y-m-d",
        defaultDate: [
          defaultRangeDate(week.first),
          defaultRangeDate(week.last),
        ],
      }
    );
  }

  show() {
    // TODO неочевидная логика скрытия и закрытия - обсудить с Олегом
    if (!this._statistics.getElement().parentNode.parentNode) {
      this._renderStatistics();
    }

    this._statistics.getElement().classList.remove(`visually-hidden`);
  }

  hide() {
    this._statistics.getElement().classList.add(`visually-hidden`);
  }

  _renderCharts() {
    const arrColor = [`black`, `yellow`, `blue`, `green`, `pink`];
    const arrCountColor = arrColor.map(
      (color) => this._cards.filter((elem) => color === elem.color).length
    );

    // const tagsCtx = document.querySelector(`.statistic__tags`);
    const colorsWrap = this._statistics
      .getElement()
      .querySelector(`.statistic__colors-wrap`);

    const colorsCtx = this._statistics
      .getElement()
      .querySelector(`.statistic__colors`);

    colorsWrap.classList.remove(`visually-hidden`);

    new Chart(colorsCtx, {
      plugins: [ChartDataLabels],
      type: `pie`,
      data: {
        labels: arrColor,
        datasets: [
          {
            data: arrCountColor,
            backgroundColor: arrColor,
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            display: false,
          },
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, it) => acc + parseFloat(it));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} CARDS — ${tooltipPercentage}%`;
            },
          },
          displayColors: false,
          backgroundColor: `#ffffff`,
          bodyFontColor: `#000000`,
          borderColor: `#000000`,
          borderWidth: 1,
          cornerRadius: 0,
          xPadding: 15,
          yPadding: 15,
        },
        title: {
          display: true,
          text: `DONE BY: COLORS`,
          fontSize: 16,
          fontColor: `#000000`,
        },
        legend: {
          position: `left`,
          labels: {
            boxWidth: 15,
            padding: 25,
            fontStyle: 500,
            fontColor: `#000000`,
            fontSize: 13,
          },
        },
      },
    });

    this._statistics
      .getElement()
      .querySelectorAll(`canvas`)
      .forEach((canvas) => {
        canvas.style.width = `400px`;
        canvas.style.height = `300px`;
      });
    // colorsCtx.style.height = `300px`;
  }
}

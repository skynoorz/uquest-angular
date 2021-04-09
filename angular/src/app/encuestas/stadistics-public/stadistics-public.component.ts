import {Component, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {EncuestasService} from "../../services/encuestas.service";
import {Encuesta} from "../../classes/encuesta";
import {ActivatedRoute, Router} from "@angular/router";
import {RespuestasService} from "../../services/respuestas.services";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-stadistics-public',
  templateUrl: './stadistics-public.component.html',
  styleUrls: ['./stadistics-public.component.css']
})
export class StadisticsPublicComponent implements OnInit {

  public encuesta: Encuesta = new Encuesta();
  basePath: string = environment.basePath;
  private pdfMake: pdfMake = pdfMake;

  private chartOM: am4charts.PieChart;
  private chartVerif: am4charts.PieChart;
  private chartLineal: am4charts.XYChart;
  private chartCloud: am4plugins_wordCloud.WordCloud;

  private arrChartOM: am4charts.PieChart[] = [];
  private arrChartVerif: am4charts.PieChart[] = [];
  private arrChartLineal: am4charts.XYChart[] = [];
  private arrChartCloud: am4plugins_wordCloud.WordCloud[] = [];

  @ViewChild('containerPreguntas', {static: true}) divView: ElementRef

  constructor(@Inject(PLATFORM_ID) private platformId,
              private zone: NgZone,
              private activatedRoute: ActivatedRoute,
              private encuestaService: EncuestasService,
              private router: Router,
              private respuestaService: RespuestasService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if (id) {
        this.encuestaService.getEncuesta(id).subscribe((encuesta) => {
          // if (encuesta.usuario.id == JSON.parse(sessionStorage.getItem('persona')).id) {
          this.encuesta = encuesta;
          // } else {
          //   Swal.fire("Acceso denegado", "lo siento, no tienes acceso a este recurso", "warning")
          //   this.router.navigate(['/'])
          // }
        })
      }
    })
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      this.activatedRoute.params.subscribe(params => {
        let id = params ['id']
        if (id) {
          this.encuestaService.getEncuesta(id).subscribe((encuesta) => {
            this.respuestaService.getRespuestasByEncuestaId(id).subscribe(respuestas => {
              // Empiezo a generar los charts por cada pregunta
              this.encuesta.preguntas.forEach((pregunta, index) => {

                // genero divs en document
                const div = document.createElement('div');
                div.setAttribute("id", "chart_" + pregunta.id);
                div.setAttribute("style", "margin-top: 30px; margin-bottom: 30px;" + pregunta.id);

                const divcontent = document.createElement('div');
                divcontent.setAttribute("id", "chart_content_" + pregunta.id);
                divcontent.setAttribute("style", "height: 300px;");
                div.appendChild(divcontent)

                this.divView.nativeElement.appendChild(div);

                switch (pregunta.tipo) {
                  case 'Respuesta Simple':
                    this.respuestaService.getRespuestasPublicByPreguntaId(pregunta.id).subscribe(respuestas => {
                      if (respuestas.length > 0) {
                        this.chartCloud = am4core.create(divcontent.getAttribute("id"), am4plugins_wordCloud.WordCloud);
                        let series = this.chartCloud.series.push(new am4plugins_wordCloud.WordCloudSeries());
                        series.text = "";
                        respuestas.forEach(respuesta => {
                          // series.text.concat(respuesta);
                          series.text = series.text + respuesta + " ";
                        })
                        // TITULO
                        let title = this.chartCloud.titles.create();
                        title.text = index + 1 + ".- " + pregunta.descripcion;
                        title.fontSize = 25;
                        title.marginBottom = 30;

                        this.chartCloud.logo.disabled = true;
                        this.chartCloud.exporting.menu = new am4core.ExportMenu();

                        this.chartCloud.height = 300;
                        this.chartCloud.maxHeight = 300;

                        this.arrChartCloud.push(this.chartCloud);
                      } else {
                        divcontent.setAttribute("style", "height: 0px;");

                        const h1 = document.createElement('h1');
                        h1.setAttribute("style", "margin-top: 30px");
                        h1.innerHTML = index + 1 + ".-" + pregunta.descripcion;
                        div.appendChild(h1)

                        const divEmpty = document.createElement('div');
                        divEmpty.setAttribute("id", "div_empty_" + pregunta.id);
                        divEmpty.innerHTML = "<h3>No hay respuestas</h3>";
                        div.appendChild(divEmpty)


                      }
                    })

                    break;
                  case 'Parrafo':
                    this.respuestaService.getRespuestasPublicByPreguntaId(pregunta.id).subscribe(respuestas => {
                      if (respuestas.length > 0) {
                        this.chartCloud = am4core.create(divcontent.getAttribute("id"), am4plugins_wordCloud.WordCloud);
                        let series = this.chartCloud.series.push(new am4plugins_wordCloud.WordCloudSeries());
                        series.text = "";
                        respuestas.forEach(respuesta => {
                          // series.text.concat(respuesta);
                          series.text = series.text + respuesta + " ";
                        })
                        // TITULO
                        let title = this.chartCloud.titles.create();
                        title.text = index + 1 + ".- " + pregunta.descripcion;
                        title.fontSize = 25;
                        title.marginBottom = 30;

                        this.chartCloud.logo.disabled = true;
                        this.chartCloud.exporting.menu = new am4core.ExportMenu();

                        this.chartCloud.height = 300;
                        this.chartCloud.maxHeight = 300;

                        this.arrChartCloud.push(this.chartCloud);
                      } else {
                        divcontent.setAttribute("style", "height: 0px;");

                        const h1 = document.createElement('h1');
                        h1.setAttribute("style", "margin-top: 30px");
                        h1.innerHTML = index + 1 + ".-" + pregunta.descripcion;
                        div.appendChild(h1)

                        const divEmpty = document.createElement('div');
                        divEmpty.setAttribute("id", "div_empty_" + pregunta.id);
                        divEmpty.innerHTML = "<h3>No hay respuestas</h3>";
                        div.appendChild(divEmpty)
                      }
                    })
                    break;
                  case 'Opcion Multiple':
                    // let chartOM = am4core.create(divcontent.getAttribute("id"), am4charts.PieChart);
                    this.chartOM = am4core.create(divcontent.getAttribute("id"), am4charts.PieChart);


                    // @ts-ignore
                    respuestas.respuestas.map(r => {
                      if (r.pregunta_id == pregunta.id) {
                        if (r.resp_count == null)
                          r.resp_count = 0;
                        this.chartOM.data.push({"pregunta": r.resp_text, "respuestas": r.resp_count})
                      }
                    })

                    // cuenta si existen respuestas
                    let counter_respuestas_om = 0;
                    this.chartOM.data.forEach(d => {
                      counter_respuestas_om = counter_respuestas_om + d.respuestas;
                    })
                    if (counter_respuestas_om > 0) {
                      // TITULO
                      let title = this.chartOM.titles.create();
                      title.text = index + 1 + ".- " + pregunta.descripcion;
                      title.fontSize = 25;
                      title.marginBottom = 30;

                      this.chartOM.logo.disabled = true;
                      this.chartOM.exporting.menu = new am4core.ExportMenu();

                      this.chartOM.height = 300;
                      this.chartOM.maxHeight = 300;


                      let pieSeries = this.chartOM.series.push(new am4charts.PieSeries());
                      pieSeries.dataFields.value = "respuestas";
                      pieSeries.dataFields.category = "pregunta";

                      this.arrChartOM.push(this.chartOM);
                    } else {
                      divcontent.setAttribute("style", "height: 0px;");

                      const h1 = document.createElement('h1');
                      h1.setAttribute("style", "margin-top: 30px");
                      h1.innerHTML = index + 1 + ".-" + pregunta.descripcion;
                      div.appendChild(h1)

                      const divEmpty = document.createElement('div');
                      divEmpty.setAttribute("id", "div_empty_" + pregunta.id);
                      divEmpty.innerHTML = "<h3>No hay respuestas</h3>";
                      div.appendChild(divEmpty)
                    }
                    break;
                  case 'Casillas de Verificacion':
                    this.chartVerif = am4core.create(divcontent.getAttribute("id"), am4charts.PieChart);

                    // @ts-ignore
                    respuestas.respuestas.map(r => {
                      if (r.pregunta_id == pregunta.id) {
                        if (r.resp_count == null)
                          r.resp_count = 0;
                        this.chartVerif.data.push({"pregunta": r.resp_text, "respuestas": r.resp_count})
                      }
                    })

                    let counter_respuestas_verif = 0;
                    this.chartVerif.data.forEach(d => {
                      counter_respuestas_verif = counter_respuestas_verif + d.respuestas;
                    })

                    if (counter_respuestas_verif > 0) {
                      // TITULO
                      let title2 = this.chartVerif.titles.create();
                      title2.text = index + 1 + ".- " + pregunta.descripcion;
                      title2.fontSize = 25;
                      title2.marginBottom = 30;

                      this.chartVerif.logo.disabled = true;
                      this.chartVerif.exporting.menu = new am4core.ExportMenu();
                      let pieSeriesVerif = this.chartVerif.series.push(new am4charts.PieSeries());
                      pieSeriesVerif.dataFields.value = "respuestas";
                      pieSeriesVerif.dataFields.category = "pregunta";
                      this.arrChartVerif.push(this.chartVerif);
                    } else {
                      divcontent.setAttribute("style", "height: 0px;");

                      const h1 = document.createElement('h1');
                      h1.setAttribute("style", "margin-top: 30px");
                      h1.innerHTML = index + 1 + ".-" + pregunta.descripcion;
                      div.appendChild(h1)

                      const divEmpty = document.createElement('div');
                      divEmpty.setAttribute("id", "div_empty_" + pregunta.id);
                      divEmpty.innerHTML = "<h3>No hay respuestas</h3>";
                      div.appendChild(divEmpty)
                    }

                    break;
                  case 'Escala Lineal':
                    this.chartLineal = am4core.create(divcontent.getAttribute("id"), am4charts.XYChart);


                    // @ts-ignore
                    respuestas.respuestas.map(r => {
                      if (r.pregunta_id == pregunta.id) {
                        if (r.resp_count == null)
                          r.resp_count = 0;
                        this.chartLineal.data.push({"value": r.resp_text, "respuestas": r.resp_count})
                      }
                    })

                    // valida si existen respuestas
                    let counter = 0;
                    this.chartLineal.data.forEach(d => {
                      counter = counter + d.respuestas;
                    })

                    if (counter > 0) {
                      // TITULO
                      let title3 = this.chartLineal.titles.create();
                      title3.text = index + 1 + ".- " + pregunta.descripcion;
                      title3.fontSize = 25;
                      title3.marginBottom = 30;

                      let categoryAxis = this.chartLineal.xAxes.push(new am4charts.CategoryAxis());
                      categoryAxis.dataFields.category = "value";
                      categoryAxis.title.text = "respuestas";

                      let valueAxis = this.chartLineal.yAxes.push(new am4charts.ValueAxis());
                      valueAxis.title.text = "cantidad";

                      let series = this.chartLineal.series.push(new am4charts.ColumnSeries());
                      series.name = "Escala Lineal";
                      series.columns.template.tooltipText = `Series: {name}\nValor: {value}\nRespuestas: {respuestas}`;
                      series.columns.template.fill = am4core.color("#104547"); // fill
                      series.dataFields.valueY = "respuestas";
                      series.dataFields.categoryX = "value";


                      this.chartLineal.logo.disabled = true;
                      this.chartLineal.exporting.menu = new am4core.ExportMenu();

                      this.arrChartLineal.push(this.chartLineal);
                    } else {
                      divcontent.setAttribute("style", "height: 0px;");

                      const h1 = document.createElement('h1');
                      h1.setAttribute("style", "margin-top: 30px");
                      h1.innerHTML = index + 1 + ".-" + pregunta.descripcion;
                      div.appendChild(h1)

                      const divEmpty = document.createElement('div');
                      divEmpty.setAttribute("id", "div_empty_" + pregunta.id);
                      divEmpty.innerHTML = "<h3>No hay respuestas</h3>";
                      div.appendChild(divEmpty)
                    }
                    break;
                }
              })
            })
          })
        }
      })
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      this.arrChartLineal.forEach(cl=>{
        cl.dispose();
      });
      this.arrChartOM.forEach(cl=>{
        cl.dispose();
      });
      this.arrChartVerif.forEach(cl=>{
        cl.dispose();
      });
      this.arrChartCloud.forEach(cc=>{
        cc.dispose();
      })
    });
  }

  savePDF() {
    let arrayPromise = [];
    // arrayPromise.push(this.chartOM.exporting.pdfmake);
    if (this.arrChartOM) {
      this.arrChartOM.forEach((ch, index) => {
        arrayPromise.push(ch.exporting.getImage("png"));
      })
    }
    if (this.arrChartVerif) {
      this.arrChartVerif.forEach((ch, index) => {
        arrayPromise.push(ch.exporting.getImage("png"));
      })
    }
    if (this.arrChartLineal) {
      this.arrChartLineal.forEach((ch, index) => {
        arrayPromise.push(ch.exporting.getImage("png"));
      })
    }
    if (this.arrChartCloud) {
      this.arrChartCloud.forEach((ch, index) => {
        arrayPromise.push(ch.exporting.getImage("png"));
      })
    }

    Promise.all(arrayPromise).then((res) => {
      let countRes = 0;
      var d = new Date();
      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
        d.getFullYear() + " a las " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

      const doc = {
        pageSize: "A4",
        pageOrientation: "portrait",
        pageMargins: [30, 30, 30, 30],
        content: [],
        header: {
          columns: [
            { text: 'Encuesta creada en '+this.encuesta.createAt, alignment: 'left', margin:  [5, 2]},
            { text: 'Estadisticas generadas el '+datestring, alignment: 'right', margin:  [5, 2]}
          ]
        },
      }

      doc.content.push({
        text: this.encuesta.titulo,
        fontSize: 20,
        bold: true,
        margin: [0, 20, 0, 15]
      });

      doc.content.push({
        text: '(tipo: '+this.encuesta.tipo+', categoria: '+this.encuesta.categoria.nombre+')',
        fontSize: 10,
        italics: true,
        margin: [0, 0, 0, 20]
      });

      doc.content.push({
        text: this.encuesta.descripcion,
        fontSize: 15,
        margin: [0, 0, 0, 15]
      });

      // GRAFICOS

      //Pregunta simple y Parrafo

      this.arrChartCloud.forEach(ch => {
        doc.content.push({
          text: ch.titles,
          fontSize: 15,
          margin: [0, 0, 0, 15]
        });
        doc.content.push({
          image: res[countRes],
          width: 530
        });
        countRes++;
      })

      // Lineal
      this.arrChartLineal.forEach(ch => {
        doc.content.push({
          text: ch.titles,
          fontSize: 15,
          margin: [0, 0, 0, 15]
        });
        doc.content.push({
          image: res[countRes],
          width: 530
        });
        countRes++;
      })

      // Opcion Multiple
      this.arrChartOM.forEach(ch => {
        doc.content.push({
          text: ch.titles,
          fontSize: 15,
          margin: [0, 0, 0, 15]
        });
        doc.content.push({
          image: res[countRes],
          width: 530
        });
        countRes++;
      })

      // Casillas de Verif
      this.arrChartVerif.forEach(ch => {
        doc.content.push({
          text: ch.titles,
          fontSize: 15,
          margin: [0, 0, 0, 15]
        });
        doc.content.push({
          image: res[countRes],
          width: 530
        });
        countRes++;
      })

      pdfMake.createPdf(doc).download("reporte_" + this.encuesta.descripcion + "_" + this.encuesta.createAt + ".pdf");
    });
  }
}

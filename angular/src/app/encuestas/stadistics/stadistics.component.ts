import {Component, ElementRef, Inject, NgZone, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {EncuestasService} from "../../services/encuestas.service";
import {AuthService} from "../../usuarios/auth.service";
import {Encuesta} from "../../classes/encuesta";
import {ActivatedRoute, Router} from "@angular/router";
import {RespuestasService} from "../../services/respuestas.services";
import Swal from "sweetalert2";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-stadistics',
  templateUrl: './stadistics.component.html',
  styleUrls: ['./stadistics.component.css']
})
export class StadisticsComponent implements OnInit {

  public encuesta: Encuesta = new Encuesta();
  public totalRespuestas = 0;
  basePath: string = environment.basePath;

  private chartOM: am4charts.PieChart;
  private chartVerif: am4charts.PieChart;
  private chartLineal: am4charts.XYChart;

  private arrChartOM: am4charts.PieChart[] = [];
  private arrChartVerif: am4charts.PieChart[] = [];
  private arrChartLineal: am4charts.XYChart[] = [];

  private preguntaRespuestas: { preguntaDescripcion: string, respuestas: string[] }[] = []

  @ViewChild('containerPreguntas', {static: true}) divView: ElementRef

  constructor(@Inject(PLATFORM_ID) private platformId,
              private zone: NgZone,
              private activatedRoute: ActivatedRoute,
              private encuestaService: EncuestasService,
              public authService: AuthService,
              private router: Router,
              private respuestaService: RespuestasService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params ['id']
      if (id) {
        this.encuestaService.getTotalRespuestasByEncuestaId(id).subscribe(total => {
          this.totalRespuestas = total.respuestas;
          console.log("TOTAL RESPUESTAS: ", this.totalRespuestas);
        })
        this.encuestaService.getEncuesta(id).subscribe((encuesta) => {
          if (encuesta.usuario.id == JSON.parse(sessionStorage.getItem('persona')).id) {
            this.encuesta = encuesta;
          } else {
            Swal.fire("Acceso denegado", "lo siento, no tienes acceso a este recurso", "warning")
            this.router.navigate(['/'])
          }
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
              console.log("Respuestas: ", respuestas)
              console.log("Encuesta: ", encuesta)
              // Empiezo a generar los charts por cada pregunta
              this.encuesta.preguntas.forEach((pregunta, index) => {

                // genero divs en document
                const div = document.createElement('div');
                div.setAttribute("id", "chart_" + pregunta.id);
                div.setAttribute("style", "margin-top: 30px; margin-bottom: 30px;" + pregunta.id);

                // titutlo
                // const h1 = document.createElement('h1');
                // h1.setAttribute("style", "margin-top: 30px");
                // h1.innerHTML = pregunta.descripcion;
                // div.appendChild(h1)

                const divcontent = document.createElement('div');
                // h1.setAttribute("id", "h1_" + pregunta.id);
                divcontent.setAttribute("id", "chart_content_" + pregunta.id);
                if (pregunta.tipo != 'Respuesta Simple') {
                  if (pregunta.tipo != 'Parrafo')
                    divcontent.setAttribute("style", "height: 300px;" + pregunta.id);
                }

                // div.appendChild(h1)
                div.appendChild(divcontent)

                // console.log(h1)
                // console.log(div)
                this.divView.nativeElement.appendChild(div);

                switch (pregunta.tipo) {
                  case 'Respuesta Simple':
                    this.respuestaService.getRespuestasByPreguntaId(pregunta.id).subscribe(respuestas => {

                      const titulo = document.createElement('span');
                      titulo.setAttribute("style", "font-style: 400 14px/20px 'Roboto,Helvetica Neue', sans-serif;");
                      titulo.innerHTML = index + 1 + ".- " + pregunta.descripcion;
                      div.appendChild(titulo);

                      respuestas.forEach(respuesta => {
                        const span = document.createElement('li')
                        span.innerHTML = respuesta + "</br>"
                        div.appendChild(span);
                        // this.respuestasSimple.push(new Map().set(pregunta.descripcion,respuesta));
                      })
                      this.preguntaRespuestas.push({preguntaDescripcion: pregunta.descripcion, respuestas: respuestas})
                      console.log("preguntaRespuestas: ", this.preguntaRespuestas);
                    })
                    break;
                  case 'Parrafo':
                    this.respuestaService.getRespuestasByPreguntaId(pregunta.id).subscribe(respuestas => {
                      const titulo = document.createElement('div');
                      titulo.setAttribute("style", "font-size: 25px;font-weight: 400;font-stretch: normal;line-height: 20px; padding-top: 30px; padding-bottom:30px; text-align: center");
                      titulo.innerHTML = index + 1 + ".- " + pregunta.descripcion;
                      div.appendChild(titulo);
                      respuestas.forEach(respuesta => {
                        const span = document.createElement('li')
                        span.innerHTML = respuesta + "</br>"
                        div.appendChild(span);
                        // this.respuestasParrafo.push(new Map().set(pregunta.descripcion,respuesta));
                      })
                      this.preguntaRespuestas.push({preguntaDescripcion: pregunta.descripcion, respuestas: respuestas})
                      console.log("preguntaRespuestas: ", this.preguntaRespuestas);
                    })
                    break;
                  case 'Opcion Multiple':
                    // let chartOM = am4core.create(divcontent.getAttribute("id"), am4charts.PieChart);
                    this.chartOM = am4core.create(divcontent.getAttribute("id"), am4charts.PieChart);
                    // TITULO
                    let title = this.chartOM.titles.create();
                    title.text = index + 1 + ".- " + pregunta.descripcion;
                    title.fontSize = 25;
                    title.marginBottom = 30;

                    // @ts-ignore
                    respuestas.respuestas.map(r => {
                      if (r.pregunta_id == pregunta.id) {
                        if (r.resp_count == null)
                          r.resp_count = 0;
                        this.chartOM.data.push({"pregunta": r.resp_text, "respuestas": r.resp_count})
                      }
                    })
                    this.chartOM.logo.disabled = true;
                    this.chartOM.exporting.menu = new am4core.ExportMenu();

                    this.chartOM.height = 300;
                    this.chartOM.maxHeight = 300;


                    let pieSeries = this.chartOM.series.push(new am4charts.PieSeries());
                    pieSeries.dataFields.value = "respuestas";
                    pieSeries.dataFields.category = "pregunta";

                    this.arrChartOM.push(this.chartOM);
                    break;
                  case 'Casillas de Verificacion':
                    this.chartVerif = am4core.create(divcontent.getAttribute("id"), am4charts.PieChart);
                    // TITULO
                    let title2 = this.chartVerif.titles.create();
                    title2.text = index + 1 + ".- " + pregunta.descripcion;
                    title2.fontSize = 25;
                    title2.marginBottom = 30;
                    // @ts-ignore
                    respuestas.respuestas.map(r => {
                      if (r.pregunta_id == pregunta.id) {
                        if (r.resp_count == null)
                          r.resp_count = 0;
                        this.chartVerif.data.push({"pregunta": r.resp_text, "respuestas": r.resp_count})
                      }
                    })

                    this.chartVerif.logo.disabled = true;
                    this.chartVerif.exporting.menu = new am4core.ExportMenu();
                    let pieSeriesVerif = this.chartVerif.series.push(new am4charts.PieSeries());
                    pieSeriesVerif.dataFields.value = "respuestas";
                    pieSeriesVerif.dataFields.category = "pregunta";
                    this.arrChartVerif.push(this.chartVerif);
                    break;
                  case 'Escala Lineal':
                    this.chartLineal = am4core.create(divcontent.getAttribute("id"), am4charts.XYChart);
                    // TITULO
                    let title3 = this.chartLineal.titles.create();
                    title3.text = index + 1 + ".- " + pregunta.descripcion;
                    title3.fontSize = 25;
                    title3.marginBottom = 30;

                    // @ts-ignore
                    respuestas.respuestas.map(r => {
                      if (r.pregunta_id == pregunta.id) {
                        if (r.resp_count == null)
                          r.resp_count = 0;
                        this.chartLineal.data.push({"value": r.resp_text, "respuestas": r.resp_count})
                      }
                    })
                    console.log("linealData", this.chartLineal.data);

                    let categoryAxis = this.chartLineal.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "value";
                    categoryAxis.title.text = "respuestas";

                    let valueAxis = this.chartLineal.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.title.text = "rango";

                    let series = this.chartLineal.series.push(new am4charts.ColumnSeries());
                    series.name = "Escala Lineal";
                    series.columns.template.tooltipText = `Series: {name}\nValor: {value}\nRespuestas: {respuestas}`;
                    series.columns.template.fill = am4core.color("#104547"); // fill
                    series.dataFields.valueY = "respuestas";
                    series.dataFields.categoryX = "value";


                    this.chartLineal.logo.disabled = true;
                    this.chartLineal.exporting.menu = new am4core.ExportMenu();

                    this.arrChartLineal.push(this.chartLineal);
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
      if (this.chartOM) {
        this.chartOM.dispose();
      }
      if (this.chartVerif) {
        this.chartVerif.dispose();
      }
      if (this.chartLineal) {
        this.chartLineal.dispose();
      }
    });
  }

  savePDF() {
    let pdfMake;
    let arrayPromise = [];
    arrayPromise.push(this.chartOM.exporting.pdfmake);
    arrayPromise.push(this.chartVerif.exporting.pdfmake);
    arrayPromise.push(this.chartLineal.exporting.pdfmake);
    if (this.arrChartOM.length > 0) {
      this.arrChartOM.forEach((ch, index) => {
        // console.log("ch[index]", ch[index+1])
        arrayPromise.push(ch.exporting.getImage("png"));
      })
    }
    if (this.arrChartVerif.length > 0) {
      this.arrChartVerif.forEach((ch, index) => {
        arrayPromise.push(ch.exporting.getImage("png"));
      })
    }
    if (this.arrChartLineal.length > 0) {
      this.arrChartLineal.forEach((ch, index) => {
        arrayPromise.push(ch.exporting.getImage("png"));
      })
    }
    // Promise.all([
    //   this.chartOM.exporting.pdfmake,
    //   this.arrChartOM[0].exporting.getImage("png"),
    //   this.arrChartOM[1].exporting.getImage("png"),
    //   // this.chartVerif.exporting.getImage("png"),
    //   // this.chartLineal.exporting.getImage("png")
    // ]).then((res) => {
    Promise.all(arrayPromise).then((res) => {

      let countRes = 1;

      var d = new Date();

      var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        d.getFullYear() + " a las " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);


      console.log("res", res)
      pdfMake = res[0];
      let doc = {
        pageSize: "A4",
        pageOrientation: "portrait",
        pageMargins: [30, 30, 30, 30],
        content: [],
        header: {
          columns: [
            {text: 'Encuesta creada en ' + this.encuesta.createAt, alignment: 'left', margin: [5, 2]},
            {text: 'Estadisticas generadas el ' + datestring, alignment: 'right', margin: [5, 2]}
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
        text: '(tipo: ' + this.encuesta.tipo + ', categoria: ' + this.encuesta.categoria.nombre + ')',
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

      if (this.preguntaRespuestas.length > 0) {
        this.preguntaRespuestas.forEach(pr => {
          doc.content.push({
            text: pr.preguntaDescripcion,
            alignment: 'center',
            fontSize: 15,
            margin: [0, 0, 0, 15]
          });
          pr.respuestas.forEach(respuesta => {
            doc.content.push({
              text: "- " + respuesta,
              fontSize: 9,
              margin: [0, 0, 0, 0]
            })
          })
        })
      }
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


      pdfMake.createPdf(doc).download("reporte_" + this.encuesta.createAt + ".pdf");
    });


  }

  generatePDF() {
    // begin PDF layout
    var layout = {
      "content": []
    };

    // add chart 1
    layout.content.push({
      "image": this.chartOM.exporting.getImage('png'),
      "fit": [523, 300]
    });

    // finally, download our PDF
    this.chartOM.exporting.pdfmake.then(function (pdfMake) {
      pdfMake.createPdf(layout).download("amcharts4.pdf");
    });
  }

  saveCSV() {
    this.respuestaService.getCSV(this.encuesta.id).subscribe(r => {
        console.log("Respuesta: ", r);
      }
    )
  }
}

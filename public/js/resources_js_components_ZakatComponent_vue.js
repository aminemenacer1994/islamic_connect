"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_ZakatComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ZakatComponent.vue?vue&type=script&lang=js":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ZakatComponent.vue?vue&type=script&lang=js ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'ZakatCalculator',
  directives: {
    tooltip: {
      mounted(el, binding) {
        el.setAttribute('title', binding.value);
        el.classList.add('has-tooltip');
      }
    }
  },
  data() {
    return {
      chartInstance: null,
      ChartCtor: null,
      showCharts: false,
      isChartLibLoading: false,
      zakatCalculated: false,
      isLoadingPrices: false,
      hawlMet: true,
      goldGrams: 0,
      goldPrice: 0,
      silverGrams: 0,
      silverPrice: 0,
      cash: 0,
      investments: 0,
      businessAssets: 0,
      realEstate: 0,
      otherAssets: 0,
      agriculturalProduce: 0,
      agriculturalProduceType: 'irrigated',
      agriculturalNisabMet: false,
      liabilities: 0,
      otherLiabilities: 0,
      selectedCurrency: 'GBP',
      nisabType: 'gold',
      errors: {},
      currencySymbols: {
        USD: '$',
        GBP: '£',
        EUR: '€',
        SAR: '﷼',
        AED: 'د.إ',
        PKR: '₨',
        INR: '₹',
        BDT: '৳',
        MYR: 'RM',
        IDR: 'Rp'
      },
      faqs: [{
        question: 'What is Zakat?',
        answer: 'Zakat is one of the Five Pillars of Islam, an obligatory form of charity where eligible Muslims give 2.5% of their wealth annually to purify their wealth and support the needy. It promotes social justice and spiritual growth.',
        isOpen: false
      }, {
        question: 'Who is eligible to pay Zakat?',
        answer: 'Every sane, adult Muslim whose net wealth exceeds the Nisab threshold (e.g., 85g of gold or 595g of silver) for one lunar year (Hawl) is required to pay Zakat.',
        isOpen: false
      }, {
        question: 'What types of assets are zakatable?',
        answer: 'Zakatable assets include cash, savings, gold, silver, investments (stocks, shares), business inventory, and investment properties held for a lunar year. Personal items like your primary home or car are exempt.',
        isOpen: false
      }, {
        question: 'How is Zakat calculated?',
        answer: 'Sum your zakatable assets, subtract deductible liabilities (e.g., short-term debts), and if the net wealth exceeds the Nisab, pay 2.5% as Zakat. For agricultural produce, pay 5% (irrigated) or 10% (rain-fed).',
        isOpen: false
      }, {
        question: 'When should Zakat be paid?',
        answer: 'Zakat is due after one lunar year (Hawl) of possessing wealth above the Nisab. Many Muslims choose to pay during Ramadan for increased spiritual rewards, but it can be paid anytime during the year.',
        isOpen: false
      }, {
        question: 'Who can receive Zakat?',
        answer: 'Zakat can be given to eight categories outlined in the Quran (Surah At-Tawbah, 9:60): the poor, the needy, Zakat administrators, those whose hearts are to be reconciled, those in bondage, debtors, those in the cause of Allah, and stranded travelers.',
        isOpen: false
      }]
    };
  },
  computed: {
    currencySymbol() {
      return this.currencySymbols[this.selectedCurrency] || '$';
    },
    totalAssets() {
      if (!this.hawlMet) return 0;
      return this.goldGrams * this.goldPrice + this.silverGrams * this.silverPrice + this.cash + this.investments + this.businessAssets + this.realEstate + this.otherAssets;
    },
    totalLiabilities() {
      return this.liabilities + this.otherLiabilities;
    },
    zakatableAmount() {
      const amount = this.totalAssets - this.totalLiabilities;
      return amount > 0 ? amount : 0;
    },
    wealthZakat() {
      return this.isWealthEligible ? this.zakatableAmount * 0.025 : 0;
    },
    agriculturalZakat() {
      if (this.agriculturalProduce <= 0 || !this.agriculturalNisabMet) return 0;
      const rate = this.agriculturalProduceType === 'rain-fed' ? 0.10 : 0.05;
      return this.agriculturalProduce * rate;
    },
    zakatDue() {
      return this.wealthZakat + this.agriculturalZakat;
    },
    nisabThreshold() {
      if (this.nisabType === 'gold' && this.goldPrice > 0) {
        return 85 * this.goldPrice;
      } else if (this.nisabType === 'silver' && this.silverPrice > 0) {
        return 595 * this.silverPrice;
      }
      return null;
    },
    nisabTypeLabel() {
      return this.nisabType === 'gold' ? 'Based on Gold (85g)' : 'Based on Silver (595g)';
    },
    isWealthEligible() {
      return this.nisabThreshold !== null && this.zakatableAmount >= this.nisabThreshold;
    },
    isEligible() {
      return this.isWealthEligible || this.agriculturalZakat > 0;
    },
    isFormValid() {
      const values = [this.goldGrams, this.goldPrice, this.silverGrams, this.silverPrice, this.cash, this.investments, this.businessAssets, this.realEstate, this.otherAssets, this.agriculturalProduce, this.liabilities, this.otherLiabilities];
      return values.every(v => Number.isFinite(v) && v >= 0);
    },
    assetBreakdown() {
      return {
        'Gold': this.goldGrams * this.goldPrice,
        'Silver': this.silverGrams * this.silverPrice,
        'Cash': this.cash,
        'Investments': this.investments,
        'Business Assets': this.businessAssets,
        'Real Estate': this.realEstate,
        'Other Assets': this.otherAssets
      };
    }
  },
  methods: {
    validateForm() {
      this.errors = {};
      let isValid = true;
      const fields = [['goldGrams', this.goldGrams, 'Grams'], ['goldPrice', this.goldPrice, 'Price'], ['silverGrams', this.silverGrams, 'Grams'], ['silverPrice', this.silverPrice, 'Price'], ['cash', this.cash, 'Amount'], ['investments', this.investments, 'Amount'], ['businessAssets', this.businessAssets, 'Amount'], ['realEstate', this.realEstate, 'Amount'], ['otherAssets', this.otherAssets, 'Amount'], ['agriculturalProduce', this.agriculturalProduce, 'Amount'], ['liabilities', this.liabilities, 'Amount'], ['otherLiabilities', this.otherLiabilities, 'Amount']];
      for (const [key, value, label] of fields) {
        if (!Number.isFinite(value) || value < 0) {
          this.errors[key] = `${label} must be a non-negative number`;
          isValid = false;
        }
      }
      return isValid;
    },
    calculateZakat() {
      if (!this.validateForm()) return;
      const wealthAssetsEntered = this.totalAssets > 0 || this.totalLiabilities > 0;
      if (wealthAssetsEntered && this.nisabThreshold === null) {
        const nisabPriceKey = this.nisabType === 'gold' ? 'goldPrice' : 'silverPrice';
        this.errors[nisabPriceKey] = `Enter ${this.nisabType} price to calculate Nisab`;
        return;
      }
      this.zakatCalculated = true;
      this.$nextTick(() => {
        if (window.innerWidth <= 768 && this.$refs.zakatSummary) {
          this.$refs.zakatSummary.scrollIntoView({
            behavior: 'smooth'
          });
        }
        this.renderChartIfReady();
      });
    },
    async ensureChartLoaded() {
      if (this.ChartCtor) return;
      this.isChartLibLoading = true;
      try {
        const mod = await __webpack_require__.e(/*! import() */ "/js/vendor").then(__webpack_require__.bind(__webpack_require__, /*! chart.js/auto */ "./node_modules/chart.js/auto/auto.mjs"));
        this.ChartCtor = mod.default || mod;
      } catch (e) {
        console.error('Failed to load chart library', e);
        this.showCharts = false;
      } finally {
        this.isChartLibLoading = false;
      }
    },
    async renderChartIfReady() {
      if (!this.showCharts) return this.destroyChart();
      await this.ensureChartLoaded();
      const canvas = this.$refs.zakatChart;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const assetValues = Object.values(this.assetBreakdown).filter(v => v > 0);
      const assetLabels = Object.keys(this.assetBreakdown).filter(k => this.assetBreakdown[k] > 0);
      if (this.chartInstance) this.chartInstance.destroy();
      this.chartInstance = new this.ChartCtor(ctx, {
        type: 'doughnut',
        data: {
          labels: assetLabels,
          datasets: [{
            data: assetValues,
            backgroundColor: ['#f1c40f', '#7f8c8d', '#2ecc71', '#3498db', '#9b59b6', '#e74c3c', '#27ae60', '#e67e22', '#1abc9c'],
            borderColor: '#fff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                label: context => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: ${this.currencySymbol}${Number(value).toLocaleString()}`;
                }
              }
            }
          },
          cutout: '60%'
        }
      });
    },
    destroyChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },
    printSummary() {
      const content = this.$refs.zakatSummary.innerHTML;
      const generatedDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
      const printWindow = window.open('', '', 'width=900,height=800');
      printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Zakat Summary - ${generatedDate}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #fff;
          color: #1f2937;
          line-height: 1.7;
          padding: 60px 20px;
        }
        .container {
          max-width: 820px;
          margin: 0 auto;
          background: white;
          padding: 50px 60px;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.07);
        }
        .header {
          text-align: center;
          margin-bottom: 60px;
          padding-bottom: 30px;
          border-bottom: 4px solid #f1f5f9;
        }
        .header h1 {
          font-size: 36px;
          font-weight: 800;
          color: #111827;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .header p {
          font-size: 18px;
          color: #64748b;
          font-weight: 500;
        }

        /* Hide buttons completely */
        .btn, .el-button, button, .no-print {
          display: none !important;
        }

        /* Asset Grid – Spacious & Clean */
        .assets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
          margin: 50px 0;
          padding: 32px;
          background: #f8fafc;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
        }
        .asset-item {
          background: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          transition: transform 0.2s;
        }
        .asset-label {
          font-size: 15px;
          color: #64748b;
          margin-bottom: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .asset-value {
          font-size: 22px;
          font-weight: 700;
          color: #111827;
        }

        /* Liabilities & Zakatables */
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 18px 0;
          font-size: 18px;
          border-bottom: 1px dashed #e2e8f0;
        }
        .info-row:last-child { border-bottom: none; }
        .info-label { color: #475569; font-weight: 500; }
        .info-value { font-weight: 700; color: #111827; }

        /* Total Zakat Due – Hero Section */
        .zakat-due {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          color: white;
          padding: 48px 32px;
          border-radius: 18px;
          text-align: center;
          margin: 60px 0;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.25);
        }
        .zakat-due h3 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 16px;
          opacity: 0.95;
        }
        .zakat-due .amount {
          font-size: 64px;
          font-weight: 800;
          letter-spacing: -2px;
        }
        .zakat-due .currency {
          font-size: 32px;
          vertical-align: top;
          margin-right: 8px;
        }

        /* Nisab & Obligation */
        .nisab-info {
          text-align: center;
          padding: 32px;
          background: #fffbeb;
          border: 2px solid #fbbf24;
          border-radius: 14px;
          margin: 50px 0;
        }
        .nisab-info h4 {
          color: #92400e;
          font-size: 20px;
          margin-bottom: 8px;
        }
        .nisab-info p {
          color: #78350f;
          font-size: 16px;
        }

        .obligation {
          text-align: center;
          padding: 40px;
          background: #fef2f2;
          border: 3px solid #fca5a5;
          border-radius: 18px;
          margin: 60px 0;
        }
        .obligation h2 {
          font-size: 32px;
          color: #991b1b;
          margin-bottom: 16px;
          font-weight: 700;
        }
        .obligation p {
          font-size: 19px;
          color: #7f1d1d;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Print Optimizations */
        @media print {
          body { padding: 0; background: white; }
          .container {
            box-shadow: none;
            padding: 40px;
            border-radius: 0;
          }
          @page { margin: 1.8cm; }
          .zakat-due, .obligation, .nisab-info {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      </style>
    </head>
    <body onload="window.print(); window.close()">
      <div class="container">
        <div class="header">
          <h1>Zakat Summary</h1>
          <p>Generated on ${generatedDate}</p>
        </div>

        <!-- This is your original content from zakatSummary ref -->
        ${content}

      </div>
    </body>
    </html>
  `);
      printWindow.document.close();
    },
    shareSummary() {
      const summaryText = `
        Zakat Summary
        Currency: ${this.selectedCurrency} (${this.currencySymbol})
        Total Assets: ${this.currencySymbol}${this.totalAssets.toLocaleString()}
        Liabilities: ${this.currencySymbol}${this.totalLiabilities.toLocaleString()}
        Zakatable Amount: ${this.currencySymbol}${this.zakatableAmount.toLocaleString()}
        Zakat Due: ${this.currencySymbol}${this.zakatDue.toLocaleString()}
        Nisab Threshold: ${this.currencySymbol}${this.nisabThreshold.toLocaleString()} (${this.nisabTypeLabel})
        Status: ${this.isEligible ? 'Zakat is Obligatory' : 'Below Nisab'}
      `;
      if (navigator.share) {
        navigator.share({
          title: 'Zakat Calculation Summary',
          text: summaryText
        }).catch(error => {
          console.error('Error sharing summary:', error);
        });
      } else {
        navigator.clipboard.writeText(summaryText).then(() => {
          alert('Summary copied to clipboard!');
        }).catch(error => {
          console.error('Error copying to clipboard:', error);
        });
      }
    },
    resetCalculator() {
      this.destroyChart();
      this.showCharts = false;
      this.hawlMet = true;
      this.goldGrams = 0;
      this.goldPrice = 0;
      this.silverGrams = 0;
      this.silverPrice = 0;
      this.cash = 0;
      this.investments = 0;
      this.businessAssets = 0;
      this.realEstate = 0;
      this.otherAssets = 0;
      this.agriculturalProduce = 0;
      this.agriculturalProduceType = 'irrigated';
      this.agriculturalNisabMet = false;
      this.liabilities = 0;
      this.otherLiabilities = 0;
      this.selectedCurrency = 'GBP';
      this.nisabType = 'gold';
      this.zakatCalculated = false;
      this.errors = {};
    },
    async fetchLivePrices() {
      this.isLoadingPrices = true;
      try {
        const response = await fetch(`https://api.nbp.pl/api/cenyzlota/today/?format=json`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.length > 0 && data[0].cena) {
          this.goldPrice = data[0].cena;
        }
        this.silverPrice = this.goldPrice / 75;
        alert('Live prices fetched successfully! Please verify them before calculating.');
      } catch (error) {
        console.error('Failed to fetch live prices:', error);
        alert('Could not fetch live prices. Please enter them manually.');
      } finally {
        this.isLoadingPrices = false;
      }
    },
    toggleFaq(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen;
    }
  },
  watch: {
    showCharts() {
      this.$nextTick(() => this.renderChartIfReady());
      try {
        localStorage.setItem('zakat_show_charts', String(this.showCharts));
      } catch (_) {}
    },
    assetBreakdown: {
      deep: true,
      handler() {
        if (this.zakatCalculated) this.renderChartIfReady();
      }
    }
  },
  mounted() {
    var _this$$refs$zakatCalc;
    try {
      const saved = localStorage.getItem('zakat_show_charts');
      if (saved === 'true') this.showCharts = true;
    } catch (_) {}
    (_this$$refs$zakatCalc = this.$refs.zakatCalculator) === null || _this$$refs$zakatCalc === void 0 || _this$$refs$zakatCalc.focus();
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ZakatComponent.vue?vue&type=script&lang=js":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ZakatComponent.vue?vue&type=script&lang=js ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _components_vue_ZakatComponent_vue__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _components_vue_ZakatComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/vue/ZakatComponent.vue */ "./resources/components/vue/ZakatComponent.vue");


/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ZakatComponent.vue?vue&type=template&id=94077780&scoped=true":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ZakatComponent.vue?vue&type=template&id=94077780&scoped=true ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  class: "zakat-calculator",
  ref: "zakatCalculator",
  tabindex: "-1"
};
const _hoisted_2 = {
  class: "container-fluid"
};
const _hoisted_3 = {
  class: "row g-4 justify-content-center"
};
const _hoisted_4 = {
  class: "card shadow-md rounded-20"
};
const _hoisted_5 = {
  class: "card-body p-lg-5"
};
const _hoisted_6 = {
  class: "row g-3"
};
const _hoisted_7 = {
  class: "col-md-6"
};
const _hoisted_8 = ["value"];
const _hoisted_9 = {
  class: "col-md-6 mb-2"
};
const _hoisted_10 = {
  class: "row mb-3 align-items-center"
};
const _hoisted_11 = {
  class: "col-md-4"
};
const _hoisted_12 = {
  class: "col-md-5"
};
const _hoisted_13 = {
  class: "input-group"
};
const _hoisted_14 = {
  class: "input-group-text bg-light"
};
const _hoisted_15 = {
  class: "row mb-3 align-items-center"
};
const _hoisted_16 = {
  class: "col-md-4"
};
const _hoisted_17 = {
  class: "col-md-5"
};
const _hoisted_18 = {
  class: "input-group"
};
const _hoisted_19 = {
  class: "input-group-text bg-light"
};
const _hoisted_20 = {
  class: "row mb-3 align-items-center"
};
const _hoisted_21 = {
  class: "col-md-9"
};
const _hoisted_22 = {
  class: "input-group"
};
const _hoisted_23 = {
  class: "input-group-text bg-light"
};
const _hoisted_24 = {
  class: "row mb-3 align-items-center"
};
const _hoisted_25 = {
  class: "col-md-9"
};
const _hoisted_26 = {
  class: "input-group"
};
const _hoisted_27 = {
  class: "input-group-text bg-light"
};
const _hoisted_28 = {
  class: "row mb-3 align-items-center"
};
const _hoisted_29 = {
  class: "col-md-9"
};
const _hoisted_30 = {
  class: "input-group"
};
const _hoisted_31 = {
  class: "input-group-text bg-light"
};
const _hoisted_32 = {
  class: "row mb-3 align-items-center"
};
const _hoisted_33 = {
  class: "col-md-9"
};
const _hoisted_34 = {
  class: "input-group"
};
const _hoisted_35 = {
  class: "input-group-text bg-light"
};
const _hoisted_36 = {
  class: "row mb-3 align-items-center"
};
const _hoisted_37 = {
  class: "col-md-9"
};
const _hoisted_38 = {
  class: "input-group"
};
const _hoisted_39 = {
  class: "input-group-text bg-light"
};
const _hoisted_40 = {
  class: "row mb-3 align-items-center"
};
const _hoisted_41 = {
  class: "col-md-6"
};
const _hoisted_42 = {
  class: "input-group"
};
const _hoisted_43 = {
  class: "input-group-text bg-light"
};
const _hoisted_44 = {
  class: "col-md-6"
};
const _hoisted_45 = {
  class: "form-check"
};
const _hoisted_46 = {
  class: "form-check"
};
const _hoisted_47 = {
  class: "form-check mt-2"
};
const _hoisted_48 = {
  class: "row mb-3 align-items-center"
};
const _hoisted_49 = {
  class: "col-md-9"
};
const _hoisted_50 = {
  class: "input-group"
};
const _hoisted_51 = {
  class: "input-group-text bg-light"
};
const _hoisted_52 = {
  class: "row mb-4 align-items-center"
};
const _hoisted_53 = {
  class: "col-md-9"
};
const _hoisted_54 = {
  class: "input-group"
};
const _hoisted_55 = {
  class: "input-group-text bg-light"
};
const _hoisted_56 = {
  class: "action-row action-row--spaced flex-wrap mt-5",
  role: "group",
  "aria-label": "Zakat calculator actions"
};
const _hoisted_57 = ["disabled"];
const _hoisted_58 = {
  key: 0,
  class: "col-lg-5",
  ref: "zakatSummary"
};
const _hoisted_59 = {
  class: "card shadow-md rounded-20 sticky-top"
};
const _hoisted_60 = {
  class: "card-body p-4",
  style: {
    "padding": "10px"
  }
};
const _hoisted_61 = {
  class: "summary-item mb-4"
};
const _hoisted_62 = {
  class: "d-flex w-100 justify-content-between align-items-center"
};
const _hoisted_63 = {
  class: "text-muted"
};
const _hoisted_64 = {
  class: "summary-item mb-4"
};
const _hoisted_65 = {
  class: "summary-metric mb-2"
};
const _hoisted_66 = {
  class: "d-flex w-100 justify-content-between align-items-center"
};
const _hoisted_67 = {
  class: "text-danger"
};
const _hoisted_68 = {
  class: "summary-item mb-4"
};
const _hoisted_69 = {
  class: "summary-metric mb-2"
};
const _hoisted_70 = {
  class: "d-flex w-100 justify-content-between align-items-center"
};
const _hoisted_71 = {
  class: "text-dark"
};
const _hoisted_72 = {
  key: 0,
  class: "summary-item mb-4"
};
const _hoisted_73 = {
  class: "d-flex justify-content-between mb-2"
};
const _hoisted_74 = {
  class: "d-flex justify-content-between mb-2"
};
const _hoisted_75 = {
  class: "summary-item bg-success-light p-3 rounded mb-4"
};
const _hoisted_76 = {
  class: "d-flex justify-content-between align-items-center"
};
const _hoisted_77 = {
  class: "text-success fw-bold mb-0"
};
const _hoisted_78 = {
  class: "summary-item mb-4"
};
const _hoisted_79 = {
  class: "d-flex justify-content-between mb-2"
};
const _hoisted_80 = {
  class: "text-muted"
};
const _hoisted_81 = {
  key: 0
};
const _hoisted_82 = {
  key: 1,
  class: "text-muted"
};
const _hoisted_83 = {
  key: 0,
  class: "small mb-0"
};
const _hoisted_84 = {
  key: 1,
  class: "small mb-0"
};
const _hoisted_85 = {
  class: "d-flex flex-column gap-2 mt-4"
};
const _hoisted_86 = {
  class: "row g-4 justify-content-center mt-4"
};
const _hoisted_87 = {
  class: "col-lg-9"
};
const _hoisted_88 = {
  class: "card shadow-md rounded-4"
};
const _hoisted_89 = {
  class: "card-body p-lg-5"
};
const _hoisted_90 = {
  class: "accordion",
  id: "zakatFaqAccordion"
};
const _hoisted_91 = ["id"];
const _hoisted_92 = ["onClick", "aria-expanded", "aria-controls"];
const _hoisted_93 = ["id", "aria-labelledby"];
const _hoisted_94 = {
  class: "accordion-body"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Hero Section "), _cache[61] || (_cache[61] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "mb-2 text-center py-4 fw-bold display-5"
  }, "Zakat Calculator", -1 /* CACHED */)), _cache[62] || (_cache[62] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "text-center container text-dark mb-4 hero-subtitle"
  }, " Easily calculate your Zakat obligation with our comprehensive tool. Determine if your wealth meets the Nisab threshold and calculate the 2.5% Zakat due on your eligible assets. Learn about Zakat and ensure accurate calculations. ", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$data.zakatCalculated ? 'col-lg-7' : 'col-lg-9', "calculator-column"])
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Currency and Nisab Selection "), _cache[38] || (_cache[38] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", {
    class: "mb-4 fw-bold text-dark text-left"
  }, "Zakat Calculator", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "currency",
    class: "form-label fw-bold"
  }, "Currency", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "currency",
    class: "form-select",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.selectedCurrency = $event),
    "aria-describedby": "currencyHelp"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.currencySymbols, (symbol, currency) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: currency,
      value: currency
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(currency) + " (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(symbol) + ") ", 9 /* TEXT, PROPS */, _hoisted_8);
  }), 128 /* KEYED_FRAGMENT */))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedCurrency]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    for: "nisab",
    class: "form-label fw-bold"
  }, "Nisab Standard", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "nisab",
    class: "form-select",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.nisabType = $event),
    "aria-describedby": "nisabHelp"
  }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "gold"
  }, "Gold (85g)", -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "silver"
  }, "Silver (595g)", -1 /* CACHED */)]))], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.nisabType]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Asset Inputs "), _cache[39] || (_cache[39] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "mt-5 fw-bold text-dark border-bottom pb-2 mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-coin me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Your Assets ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Gold Input "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "col-md-3 col-form-label fw-bold"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-gem fw-bold text-warning me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Gold ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.goldGrams
    }]),
    "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => $data.goldGrams = $event),
    placeholder: "Grams",
    min: "0",
    required: "",
    "aria-describedby": "goldGramsError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.goldGrams, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.goldPrice
    }]),
    "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.goldPrice = $event),
    placeholder: "Price per gram",
    min: "0",
    "aria-describedby": "goldPriceError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.goldPrice, void 0, {
    number: true
  }]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Silver Input "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [_cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "col-md-3 col-form-label fw-bold"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-gem text-secondary me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Silver ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.silverGrams
    }]),
    "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.silverGrams = $event),
    placeholder: "Grams",
    min: "0",
    "aria-describedby": "silverGramsError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.silverGrams, void 0, {
    number: true
  }]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.silverPrice
    }]),
    "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.silverPrice = $event),
    placeholder: "Price per gram",
    min: "0",
    "aria-describedby": "silverPriceError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.silverPrice, void 0, {
    number: true
  }]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Cash Input "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "col-md-3 col-form-label fw-bold"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-cash-coin text-success me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Cash ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_23, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.cash
    }]),
    "onUpdate:modelValue": _cache[6] || (_cache[6] = $event => $data.cash = $event),
    placeholder: "Amount in hand & bank",
    min: "0",
    "aria-describedby": "cashError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.cash, void 0, {
    number: true
  }]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Investments Input "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [_cache[27] || (_cache[27] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "col-md-3 col-form-label fw-bold"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-graph-up text-info me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Investments ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.investments
    }]),
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.investments = $event),
    placeholder: "Stocks, shares, etc.",
    min: "0",
    "aria-describedby": "investmentsError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.investments, void 0, {
    number: true
  }]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Business Assets Input "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [_cache[28] || (_cache[28] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "col-md-3 col-form-label fw-bold"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-briefcase text-dark me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Business Assets ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.businessAssets
    }]),
    "onUpdate:modelValue": _cache[8] || (_cache[8] = $event => $data.businessAssets = $event),
    placeholder: "Value of inventory",
    min: "0",
    "aria-describedby": "businessAssetsError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.businessAssets, void 0, {
    number: true
  }]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Real Estate Input "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [_cache[29] || (_cache[29] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "col-md-3 col-form-label fw-bold"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-house text-warning me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Real Estate ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.realEstate
    }]),
    "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => $data.realEstate = $event),
    placeholder: "Investment properties only",
    min: "0",
    "aria-describedby": "realEstateError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.realEstate, void 0, {
    number: true
  }]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Other Assets Input "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [_cache[30] || (_cache[30] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "col-md-3 col-form-label fw-bold"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-plus-circle-dotted text-primary me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Other Assets ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.otherAssets
    }]),
    "onUpdate:modelValue": _cache[10] || (_cache[10] = $event => $data.otherAssets = $event),
    placeholder: "Receivables, etc.",
    min: "0",
    "aria-describedby": "otherAssetsError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.otherAssets, void 0, {
    number: true
  }]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Agricultural Produce Input "), _cache[40] || (_cache[40] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "mt-5 fw-bold text-dark border-bottom pb-2 mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-wheat text-success me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Agricultural Produce ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.agriculturalProduce
    }]),
    "onUpdate:modelValue": _cache[11] || (_cache[11] = $event => $data.agriculturalProduce = $event),
    placeholder: "Value of Produce",
    min: "0",
    "aria-describedby": "agriculturalProduceError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.agriculturalProduce, void 0, {
    number: true
  }]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "radio",
    id: "irrigated",
    value: "irrigated",
    "onUpdate:modelValue": _cache[12] || (_cache[12] = $event => $data.agriculturalProduceType = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.agriculturalProduceType]]), _cache[31] || (_cache[31] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "irrigated"
  }, "Irrigated (5% Zakat)", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "radio",
    id: "rain-fed",
    value: "rain-fed",
    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => $data.agriculturalProduceType = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelRadio, $data.agriculturalProduceType]]), _cache[32] || (_cache[32] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "rain-fed"
  }, "Rain-fed (10% Zakat)", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    class: "form-check-input",
    type: "checkbox",
    id: "agri-nisab-met",
    "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => $data.agriculturalNisabMet = $event)
  }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox, $data.agriculturalNisabMet]]), _cache[33] || (_cache[33] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "form-check-label",
    for: "agri-nisab-met"
  }, " Produce reached Nisab (about 653kg / 5 wasq) ", -1 /* CACHED */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Liabilities Input "), _cache[41] || (_cache[41] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "mt-5 fw-bold text-dark border-bottom pb-2 mb-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-credit-card text-danger me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Liabilities ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [_cache[34] || (_cache[34] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "col-md-3 col-form-label fw-bold"
  }, "Short-term Debts", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.liabilities
    }]),
    "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => $data.liabilities = $event),
    placeholder: "Due within a year",
    min: "0",
    "aria-describedby": "liabilitiesError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.liabilities, void 0, {
    number: true
  }]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_52, [_cache[35] || (_cache[35] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    class: "col-md-3 col-form-label fw-bold"
  }, "Other Liabilities", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_54, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["form-control", {
      'is-invalid': $data.errors.otherLiabilities
    }]),
    "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => $data.otherLiabilities = $event),
    placeholder: "Taxes, rents, etc.",
    min: "0",
    "aria-describedby": "otherLiabilitiesError"
  }, null, 2 /* CLASS */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.otherLiabilities, void 0, {
    number: true
  }]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Action Buttons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "premium-action-button premium-action-button--primary",
    onClick: _cache[17] || (_cache[17] = (...args) => $options.calculateZakat && $options.calculateZakat(...args)),
    disabled: !$options.isFormValid,
    "aria-label": "Calculate my Zakat"
  }, [...(_cache[36] || (_cache[36] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-calculator",
    "aria-hidden": "true"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__label"
  }, "Calculate Zakat", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_57), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    class: "premium-action-button premium-action-button--outline",
    onClick: _cache[18] || (_cache[18] = (...args) => $options.resetCalculator && $options.resetCalculator(...args)),
    "aria-label": "Reset values"
  }, [...(_cache[37] || (_cache[37] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__icon"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-arrow-counterclockwise",
    "aria-hidden": "true"
  })], -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "action-row__label"
  }, "Reset", -1 /* CACHED */)]))])])])])], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Results Panel "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "fade"
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [$data.zakatCalculated ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_58, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_60, [_cache[58] || (_cache[58] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
      class: "fw-bold text-dark"
    }, "Zakat Summary", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Asset Breakdown "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_61, [_cache[43] || (_cache[43] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "mb-3 fw-bold"
    }, "Asset Breakdown", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.assetBreakdown, (value, key) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: key,
        class: "summary-metric mb-2"
      }, [_cache[42] || (_cache[42] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "summary-metric__icon"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-piggy-bank",
        "aria-hidden": "true"
      })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_62, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(key) + ":", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol) + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(value.toLocaleString()), 1 /* TEXT */)])]);
    }), 128 /* KEYED_FRAGMENT */)), _cache[44] || (_cache[44] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "progress mb-3 custom-progress"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "progress-bar bg-success progress-bar-full",
      role: "progressbar"
    })], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Liabilities "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_64, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_65, [_cache[46] || (_cache[46] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "summary-metric__icon"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-card-list",
      "aria-hidden": "true"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_66, [_cache[45] || (_cache[45] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "text-muted"
    }, "Liabilities:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_67, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol) + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalLiabilities.toLocaleString()), 1 /* TEXT */)])]), _cache[47] || (_cache[47] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "progress mb-3 custom-progress"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "progress-bar bg-danger progress-bar-full",
      role: "progressbar"
    })], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Zakatable Amount "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_68, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_69, [_cache[49] || (_cache[49] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "summary-metric__icon"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-calculator",
      "aria-hidden": "true"
    })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_70, [_cache[48] || (_cache[48] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "text-muted"
    }, "Zakatable Amount:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", _hoisted_71, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol) + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.zakatableAmount.toLocaleString()), 1 /* TEXT */)])]), _cache[50] || (_cache[50] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "progress mb-3 custom-progress"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: "progress-bar bg-dark progress-bar-full",
      role: "progressbar"
    })], -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Zakat Due Breakdown "), $options.isEligible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_72, [_cache[53] || (_cache[53] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "mb-3 fw-bold"
    }, "Zakat Breakdown", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_73, [_cache[51] || (_cache[51] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "text-muted"
    }, "On General Assets (2.5%):", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol) + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.wealthZakat.toLocaleString()), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_74, [_cache[52] || (_cache[52] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "text-muted"
    }, "On Agricultural Produce:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol) + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.agriculturalZakat.toLocaleString()), 1 /* TEXT */)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Zakat Due "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_75, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_76, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_cache[54] || (_cache[54] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
      class: "mb-1 text-dark fw-bold"
    }, "Total Zakat Due", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", _hoisted_77, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol) + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.zakatDue.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })), 1 /* TEXT */)]), _cache[55] || (_cache[55] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-check-circle-fill text-success summary-icon"
    }, null, -1 /* CACHED */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Charts Toggle + Canvas "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"summary-item mb-3\">\n                  <div class=\"form-check form-switch\">\n                    <input class=\"form-check-input ml-1\" type=\"checkbox\" id=\"showChartsSwitch\" v-model=\"showCharts\">\n                    <label class=\"form-check-label \" for=\"showChartsSwitch\">\n                      Show asset breakdown chart\n                      <span v-if=\"isChartLibLoading\" class=\"ms-2 align-middle\">\n                        <span class=\"spinner-border spinner-border-sm text-secondary\" role=\"status\" aria-hidden=\"true\"></span>\n                        <span class=\"visually-hidden\">Loading…</span>\n                      </span>\n                    </label>\n                  </div>\n                </div>\n                <div v-if=\"showCharts\" class=\"chart-container mb-4\">\n                  <canvas ref=\"zakatChart\" id=\"zakatChart\"></canvas>\n                </div> "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Nisab Threshold "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_78, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_79, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_80, "Nisab Threshold (" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.nisabTypeLabel) + "):", 1 /* TEXT */), $options.nisabThreshold !== null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_81, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.currencySymbol) + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.nisabThreshold.toLocaleString()), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("strong", _hoisted_82, "Enter " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.nisabType) + " price", 1 /* TEXT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Eligibility "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["eligibility-badge text-center p-3 rounded mt-4", $options.isEligible ? 'bg-success-light' : 'bg-light'])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$options.isEligible ? 'text-success' : 'text-muted', "fw-bold"])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$options.isEligible ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill', "me-2"])
    }, null, 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.isEligible ? 'Zakat is Obligatory' : 'Below Nisab'), 1 /* TEXT */)], 2 /* CLASS */), $options.isEligible ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_83, "Your assets exceed the Nisab threshold.")) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("p", _hoisted_84, "Your assets are below the Nisab threshold."))], 2 /* CLASS */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Action Buttons "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_85, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn btn-dark w-100",
      onClick: _cache[19] || (_cache[19] = (...args) => $options.printSummary && $options.printSummary(...args))
    }, [...(_cache[56] || (_cache[56] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-download me-2"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", {
      class: "text-center"
    }, "Download Summary", -1 /* CACHED */)]))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "btn text-center btn-outline-dark w-100",
      onClick: _cache[20] || (_cache[20] = (...args) => $options.shareSummary && $options.shareSummary(...args))
    }, [...(_cache[57] || (_cache[57] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
      class: "bi bi-share me-2"
    }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("b", {
      class: "text-center"
    }, "Share Summary", -1 /* CACHED */)]))])])])])], 512 /* NEED_PATCH */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" FAQ Section "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_86, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_87, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_88, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_89, [_cache[60] || (_cache[60] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "mb-4 fw-bold text-dark text-left"
  }, "Zakat FAQs", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_90, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.faqs, (faq, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      class: "accordion-item",
      key: index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
      class: "accordion-header",
      id: 'faq-heading-' + index
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["accordion-button", {
        collapsed: !faq.isOpen
      }]),
      type: "button",
      onClick: $event => $options.toggleFaq(index),
      "aria-expanded": faq.isOpen,
      "aria-controls": 'faq-collapse-' + index
    }, [_cache[59] || (_cache[59] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
      class: "material-icons me-2"
    }, null, -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.question), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_92)], 8 /* PROPS */, _hoisted_91), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: 'faq-collapse-' + index,
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["accordion-collapse collapse", {
        show: faq.isOpen
      }]),
      "aria-labelledby": 'faq-heading-' + index,
      "data-bs-parent": "#zakatFaqAccordion"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_94, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(faq.answer), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_93)]);
  }), 128 /* KEYED_FRAGMENT */))])])])])])])], 512 /* NEED_PATCH */);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ZakatComponent.vue?vue&type=style&index=0&id=94077780&scoped=true&lang=css":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ZakatComponent.vue?vue&type=style&index=0&id=94077780&scoped=true&lang=css ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/components/vue/ZakatComponent.vue":
/*!*****************************************************!*\
  !*** ./resources/components/vue/ZakatComponent.vue ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ZakatComponent_vue_vue_type_template_id_94077780_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ZakatComponent.vue?vue&type=template&id=94077780&scoped=true */ "./resources/components/vue/ZakatComponent.vue?vue&type=template&id=94077780&scoped=true");
/* harmony import */ var _ZakatComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ZakatComponent.vue?vue&type=script&lang=js */ "./resources/components/vue/ZakatComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _ZakatComponent_vue_vue_type_style_index_0_id_94077780_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ZakatComponent.vue?vue&type=style&index=0&id=94077780&scoped=true&lang=css */ "./resources/components/vue/ZakatComponent.vue?vue&type=style&index=0&id=94077780&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ZakatComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ZakatComponent_vue_vue_type_template_id_94077780_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-94077780"],['__file',"resources/components/vue/ZakatComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/components/vue/ZakatComponent.vue?vue&type=script&lang=js":
/*!*****************************************************************************!*\
  !*** ./resources/components/vue/ZakatComponent.vue?vue&type=script&lang=js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ZakatComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ZakatComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ZakatComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ZakatComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/components/vue/ZakatComponent.vue?vue&type=style&index=0&id=94077780&scoped=true&lang=css":
/*!*************************************************************************************************************!*\
  !*** ./resources/components/vue/ZakatComponent.vue?vue&type=style&index=0&id=94077780&scoped=true&lang=css ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_10_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_10_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_10_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ZakatComponent_vue_vue_type_style_index_0_id_94077780_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ZakatComponent.vue?vue&type=style&index=0&id=94077780&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-10.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-10.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-10.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ZakatComponent.vue?vue&type=style&index=0&id=94077780&scoped=true&lang=css");


/***/ }),

/***/ "./resources/components/vue/ZakatComponent.vue?vue&type=template&id=94077780&scoped=true":
/*!***********************************************************************************************!*\
  !*** ./resources/components/vue/ZakatComponent.vue?vue&type=template&id=94077780&scoped=true ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ZakatComponent_vue_vue_type_template_id_94077780_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ZakatComponent_vue_vue_type_template_id_94077780_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ZakatComponent.vue?vue&type=template&id=94077780&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/components/vue/ZakatComponent.vue?vue&type=template&id=94077780&scoped=true");


/***/ }),

/***/ "./resources/js/components/ZakatComponent.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/ZakatComponent.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ZakatComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ZakatComponent.vue?vue&type=script&lang=js */ "./resources/js/components/ZakatComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");



;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_ZakatComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"], [['__file',"resources/js/components/ZakatComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/ZakatComponent.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/ZakatComponent.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ZakatComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ZakatComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ZakatComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ZakatComponent.vue?vue&type=script&lang=js");
 

/***/ })

}]);
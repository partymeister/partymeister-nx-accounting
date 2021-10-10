import Ref from '../../../motor-nx-core/types/model'

export default function useVatCalculator(model: Ref<any>, setFieldValue: any) {
  const changeVatPercentage = (value: string, elements: []) => {
    if (typeof value === 'object') {
      return
    }
    elements.forEach((element: string) => {
      const priceWithoutVatElement = document.getElementById(
        element
      ) as HTMLInputElement

      const priceElement = document.getElementById(
        element.replace(/without/g, 'with')
      ) as HTMLInputElement

      if (priceWithoutVatElement) {
        const newPrice =
          Math.round(
            (Number(priceElement.value) / (1 + Number(value) / 100)) * 100
          ) / 100

        setFieldValue(element, newPrice)
      }
    })
  }

  const changePriceWithVat = (value: number, elements: []) => {
    if (typeof value === 'object') {
      return
    }

    elements.forEach((element: string) => {
      const priceWithoutVatElement = document.getElementById(
        element
      ) as HTMLInputElement

      const vatElement = document.getElementById(
        'vat_percentage'
      ) as HTMLInputElement

      if (priceWithoutVatElement) {
        const newPrice =
          Math.round(
            (Number(value) / (1 + Number(vatElement.value) / 100)) * 100
          ) / 100

        setFieldValue(element, newPrice)
      }
    })
  }

  const changePriceWithoutVat = (value: number, elements: []) => {
    if (typeof value === 'object') {
      return
    }

    elements.forEach((element: string) => {
      const priceWithoutVatElement = document.getElementById(
        element.replace(/with/g, 'without')
      ) as HTMLInputElement

      const priceElement = document.getElementById(element) as HTMLInputElement

      // const vatElement = model.value['vat_percentage']
      const vatElement = document.getElementById(
        'vat_percentage'
      ) as HTMLInputElement

      if (priceElement) {
        const newPrice =
          Math.round(
            Number(priceWithoutVatElement.value) *
              (1 + Number(vatElement.value) / 100) *
              100
          ) / 100

        setFieldValue(element, newPrice)
      }
    })
  }

  return {
    changeVatPercentage,
    changePriceWithVat,
    changePriceWithoutVat,
  }
}

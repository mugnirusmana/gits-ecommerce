export default function ProductDetail({ params }: { params: { id?: string } }) {
    const { id } = params
    return (
        <div className="w-screen h-screen">Product Detail Page ({id??'-'})</div>
    )
}